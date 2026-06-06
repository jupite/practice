# FastAPI 中大型项目结构

## 目录结构

```
FastAPI/
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── security.py
│   │   └── database.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── item.py
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── item.py
│   ├── api/
│   │   ├── __init__.py
│   │   ├── deps.py
│   │   └── v1/
│   │       ├── __init__.py
│   │       ├── users.py
│   │       └── items.py
│   └── services/
│       ├── __init__.py
│       ├── user_service.py
│       └── item_service.py
├── alembic/
│   ├── env.py
│   ├── script.py.mako
│   └── versions/
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_users.py
│   └── test_items.py
├── doc/
├── pyproject.toml
└── uv.lock
```

## 模块说明

### `app/main.py` — 应用入口

创建 `FastAPI` 实例，注册路由、中间件、生命周期事件。

```python
from fastapi import FastAPI
from app.api.v1 import users, items
from app.core.database import engine, Base

app = FastAPI(title="My API", version="1.0.0")

app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
app.include_router(items.router, prefix="/api/v1/items", tags=["items"])

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
```

---

### `app/core/` — 核心配置层

存放与业务无关的基础设施代码，全局共享。

| 文件 | 作用 |
|------|------|
| `config.py` | 使用 `pydantic-settings` 的 `BaseSettings` 管理所有配置项，从环境变量或 `.env` 文件读取。包括数据库 URL、密钥、CORS 白名单等 |
| `security.py` | 认证与授权逻辑：JWT 编解码、密码哈希/校验、OAuth2 密码流配置 |
| `database.py` | 数据库引擎（`create_async_engine`）、`AsyncSessionLocal` 工厂、`Base` 声明基类 |

**config.py 示例：**

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "My API"
    DATABASE_URL: str = "sqlite+aiosqlite:///./app.db"
    SECRET_KEY: str = "your-secret-key"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"

settings = Settings()
```

---

### `app/models/` — ORM 模型层

定义 SQLAlchemy 模型，每个模型对应数据库中的一张表。

- 与数据库表结构一一对应
- 定义列类型、约束、索引、外键关系
- 通过 `__tablename__` 映射表名

**user.py 示例：**

```python
from sqlalchemy import Column, Integer, String
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
```

---

### `app/schemas/` — Pydantic Schema 层

定义 API 请求和响应的数据格式，实现数据校验与序列化。

- **与 models 分离**：models 负责数据库映射，schemas 负责 API 数据契约
- 通常每个实体定义 `Create`、`Update`、`Response` 三种 schema
- 避免在响应中泄露敏感字段（如 `hashed_password`）

**user.py 示例：**

```python
from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str | None = None

class UserUpdate(BaseModel):
    email: EmailStr | None = None
    full_name: str | None = None

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str | None = None

    class Config:
        from_attributes = True
```

---

### `app/api/` — 路由层

定义 API 端点，处理 HTTP 请求与响应。

| 文件 | 作用 |
|------|------|
| `deps.py` | 公共依赖注入函数，如获取数据库 session、获取当前认证用户 |
| `v1/__init__.py` | 汇总 v1 版本所有路由，统一注册到 `main.py` |
| `v1/users.py` | 用户相关端点：注册、登录、查询、更新、删除 |
| `v1/items.py` | 业务实体相关端点 |

**deps.py 示例：**

```python
from typing import Generator
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import AsyncSessionLocal

async def get_db() -> Generator[AsyncSession, None, None]:
    async with AsyncSessionLocal() as session:
        yield session
```

**v1/users.py 示例：**

```python
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_db

router = APIRouter()

@router.post("/", response_model=UserResponse)
async def create_user(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    ...
```

---

### `app/services/` — 业务逻辑层（可选但推荐）

封装业务逻辑，使路由层保持轻量。

- 路由层只负责：接收请求 → 调用 service → 返回响应
- Service 层负责：校验、计算、组合多个 CRUD 操作、处理业务规则
- 便于单元测试和复用

**user_service.py 示例：**

```python
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import get_password_hash

async def create_user(db: AsyncSession, user_in: UserCreate) -> User:
    hashed_password = get_password_hash(user_in.password)
    user = User(email=user_in.email, hashed_password=hashed_password, full_name=user_in.full_name)
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user
```

---

### `alembic/` — 数据库迁移

使用 Alembic 管理数据库 schema 的版本变更。

| 文件 | 作用 |
|------|------|
| `env.py` | Alembic 运行配置，指向项目的 `Base.metadata` 和数据库 URL |
| `script.py.mako` | 迁移脚本的模板 |
| `versions/` | 存放每次迁移生成的脚本文件，按时间戳排序 |

**常用命令：**

```bash
uv run alembic init alembic          # 初始化
uv run alembic revision --autogenerate -m "create users table"  # 自动生成迁移
uv run alembic upgrade head          # 执行迁移
uv run alembic downgrade -1          # 回退一步
```

---

### `tests/` — 测试层

| 文件 | 作用 |
|------|------|
| `conftest.py` | pytest fixtures：测试用数据库、测试客户端、模拟用户 |
| `test_users.py` | 用户相关接口的测试用例 |
| `test_items.py` | 业务实体相关接口的测试用例 |

**conftest.py 示例：**

```python
import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac
```

---

## 请求流转流程

```
HTTP Request
    │
    ▼
┌─────────────┐
│  main.py    │  FastAPI 实例，中间件处理
└─────┬───────┘
      │
      ▼
┌─────────────┐
│  api/v1/    │  路由匹配，参数解析
│  users.py   │
└─────┬───────┘
      │ Depends(get_db), Depends(get_current_user)
      ▼
┌─────────────┐
│  api/deps   │  依赖注入：获取 DB session、认证用户
└─────┬───────┘
      │
      ▼
┌─────────────┐
│  schemas/   │  请求体校验（Pydantic）
│  user.py    │
└─────┬───────┘
      │
      ▼
┌─────────────┐
│  services/  │  业务逻辑处理
│  user_svc   │
└─────┬───────┘
      │
      ▼
┌─────────────┐
│  models/    │  ORM 操作数据库
│  user.py    │
└─────┬───────┘
      │
      ▼
┌─────────────┐
│  schemas/   │  响应序列化（Pydantic）
│  user.py    │
└─────┬───────┘
      │
      ▼
  HTTP Response
```

## 各层职责原则

| 层 | 职责 | 不应该做 |
|----|------|----------|
| **api/** | 路由定义、参数接收、响应返回 | 不写业务逻辑 |
| **schemas/** | 数据校验、序列化格式 | 不访问数据库 |
| **services/** | 业务逻辑、编排多个 CRUD 操作 | 不直接定义路由 |
| **models/** | 数据库表映射 | 不包含业务逻辑 |
| **core/** | 基础设施配置 | 不包含业务逻辑 |
