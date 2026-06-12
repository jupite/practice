#!/usr/bin/python3

# ============================================================
# py / python - Python 启动器与解释器
# ============================================================

# python -V / python --version     查看 Python 版本
# python script.py                 运行 Python 脚本
# python -c "代码"                  执行单行 Python 代码
# python -m 模块名                  以模块方式运行（如 python -m http.server）
# python -h                        查看 Python 帮助信息
# python -m py_compile script.py   编译检查脚本语法（不执行）
# py -3 -m venv .venv              使用 Python 3 创建虚拟环境
# py --list                        列出所有已安装的 Python 版本
# py --list-paths                  列出所有已安装 Python 版本的路径


# pip - Python 包安装器（传统方式）

# pip install <pkg>==1.2.3       安装指定版本
# pip install -r requirements.txt  从文件批量安装依赖
# pip install -e .               以可编辑模式安装当前项目
# pip uninstall <pkg>            卸载包
# pip list                       列出已安装的包
# pip freeze > requirements.txt  导出当前环境依赖到文件


# ============================================================
# uv - Python 包管理器 (替代 pip + venv + pip-tools)
# ============================================================

# uv --version                   查看 uv 版本
# uv init                        在当前目录初始化项目（生成 pyproject.toml）
# uv init --name my-app          初始化项目并指定项目名
# uv add <pkg>                   添加依赖到项目（自动更新 pyproject.toml 和 uv.lock）
# uv add --dev <pkg>             添加开发依赖
# uv remove <pkg>                移除依赖
# uv sync                        根据 uv.lock 安装所有依赖
# uv lock                        重新解析并锁定依赖（不安装）
# uv run <cmd>                   在项目虚拟环境中运行命令
# uv run python main.py          运行 Python 脚本
# uv run uvicorn main:app --reload  运行 FastAPI 开发服务器
# uv pip list                    列出已安装的包
# uv pip install <pkg>           直接安装包（类似 pip，不修改 pyproject.toml）
# uv pip uninstall <pkg>         直接卸载包
# uv venv                        创建虚拟环境（默认 .venv）
# uv venv --python 3.13          指定 Python 版本创建虚拟环境
# uv python list                 列出可用的 Python 版本
# uv python install 3.13        安装指定 Python 版本
# uv tool install <pkg>          全局安装 CLI 工具（如 ruff、black）
# uv tool run <pkg>              临时运行 CLI 工具（不安装）
# uv self update                 更新 uv 自身

