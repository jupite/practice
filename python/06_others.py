# 1. 模块导入
import math
from math import sqrt, pi
from os import path as ospath
import json as js

print(math.ceil(3.2), sqrt(16), pi, ospath.join("a", "b"))

# 2. 包与 __init__.py
# 目录结构示例:
# mypackage/
#   __init__.py
#   module_a.py
#   module_b.py
# 使用: from mypackage import module_a

# 3. 泛型 (typing)
from typing import List, Dict, Optional, Union, TypeVar, Generic

T = TypeVar("T")

class Stack(Generic[T]):
    def __init__(self):
        self._items: List[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        return self._items.pop()

s: Stack[int] = Stack()
s.push(1)
s.push(2)
print(s.pop())

# 4. Optional 与 Union
def find_user(user_id: int) -> Optional[str]:
    if user_id == 1:
        return "Alice"
    return None

def process(value: Union[int, str]) -> str:
    return str(value)

print(find_user(1), find_user(2), process(42), process("hi"))

# 5. 模式匹配 (Python 3.10+)
def describe_point(point):
    match point:
        case (0, 0):
            return "origin"
        case (x, 0):
            return f"x-axis at {x}"
        case (0, y):
            return f"y-axis at {y}"
        case (x, y):
            return f"point at ({x}, {y})"

print(describe_point((0, 0)))
print(describe_point((3, 0)))
print(describe_point((3, 4)))

# 6. 线程
import threading
import time

def worker(name, seconds):
    print(f"{name} starting")
    time.sleep(seconds)
    print(f"{name} done")

t1 = threading.Thread(target=worker, args=("Thread-1", 0.1))
t2 = threading.Thread(target=worker, args=("Thread-2", 0.1))
t1.start()
t2.start()
t1.join()
t2.join()

# 7. 协程 (async/await)
import asyncio

async def fetch(name, seconds):
    print(f"{name} fetching...")
    await asyncio.sleep(seconds)
    print(f"{name} done")
    return f"{name} result"

async def main():
    results = await asyncio.gather(
        fetch("A", 0.1),
        fetch("B", 0.1),
    )
    print(results)

asyncio.run(main())

# 8. 装饰器 (元编程)
def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.time() - start:.4f}s")
        return result
    return wrapper

@timer
def slow_add(a, b):
    time.sleep(0.1)
    return a + b

print(slow_add(1, 2))

# 9. 类装饰器
def singleton(cls):
    instances = {}
    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return get_instance

@singleton
class Config:
    def __init__(self):
        self.debug = True

c1 = Config()
c2 = Config()
print(c1 is c2)

# 10. __getattr__ / __setattr__ 元编程
class DynamicAttrs:
    def __getattr__(self, name):
        return f"Attribute '{name}' not found"

    def __setattr__(self, name, value):
        print(f"Setting {name} = {value}")
        super().__setattr__(name, value)

d = DynamicAttrs()
d.x = 10
print(d.x, d.missing)
