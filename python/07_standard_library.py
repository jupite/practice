# 1. 文件读写
with open("test_io.txt", "w", encoding="utf-8") as f:
    f.write("Hello\nPython\n")

with open("test_io.txt", "r", encoding="utf-8") as f:
    print(f.read())

import os
os.remove("test_io.txt")

# 2. 路径操作 (pathlib)
from pathlib import Path

p = Path("python") / "01_basics.py"
print(p.exists(), p.suffix, p.stem, p.parent)

# 3. 字符串处理
s = "  Hello, Python!  "
print(s.strip(), s.replace("Python", "World"), s.startswith("  H"), s.find("Python"))

# 4. 正则表达式
import re

text = "Contact: alice@test.com and bob@test.org"
emails = re.findall(r"\w+@\w+\.\w+", text)
phone = re.sub(r"\d{3}", "XXX", "Call 123-456-7890")
print(emails, phone)

pattern = re.compile(r"(\w+)@(\w+)\.(\w+)")
m = pattern.search(text)
if m:
    print(m.group(), m.groups())

# 5. 日期时间
from datetime import datetime, timedelta, timezone

now = datetime.now()
utc_now = datetime.now(timezone.utc)
tomorrow = now + timedelta(days=1)
print(now.strftime("%Y-%m-%d %H:%M:%S"), tomorrow.date(), utc_now)

parsed = datetime.strptime("2024-01-15", "%Y-%m-%d")
print(parsed)

# 6. 数学计算
import math
import random

print(math.sqrt(16), math.ceil(3.2), math.floor(3.8), math.pi, math.e)
print(random.randint(1, 10), random.choice(["a", "b", "c"]))
random.seed(42)
print(random.random())

# 7. 序列化 - JSON
import json

data = {"name": "Alice", "scores": [90, 85, 92], "active": True}
json_str = json.dumps(data, ensure_ascii=False, indent=2)
print(json_str)

loaded = json.loads(json_str)
print(loaded["name"], loaded["scores"])

# 8. 网络请求 (urllib)
from urllib.request import urlopen
from urllib.parse import urlencode

params = urlencode({"q": "python", "page": 1})
print(f"https://httpbin.org/get?{params}")

# 9. 系统与进程
import sys
import os

print(sys.version, sys.platform)
print(os.getcwd(), os.listdir("."))
print(os.environ.get("PATH", "")[:50])

# 10. collections 高级容器
from collections import Counter, defaultdict, namedtuple, OrderedDict

counter = Counter("abracadabra")
print(counter.most_common(3))

dd = defaultdict(list)
dd["fruits"].append("apple")
dd["fruits"].append("banana")
print(dd)

Point = namedtuple("Point", ["x", "y"])
pt = Point(1, 2)
print(pt.x, pt.y, pt._asdict())

od = OrderedDict([("b", 2), ("a", 1), ("c", 3)])
print(list(od.keys()))

# 11. itertools
from itertools import chain, combinations, permutations, product

print(list(chain([1, 2], [3, 4])))
print(list(combinations("ABC", 2)))
print(list(permutations("AB", 2)))
print(list(product([0, 1], [0, 1])))

# 12. functools
from functools import reduce, lru_cache, partial

print(reduce(lambda a, b: a + b, [1, 2, 3, 4, 5]))

@lru_cache(maxsize=128)
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(30))

def power(base, exp):
    return base ** exp

square = partial(power, exp=2)
print(square(5))
