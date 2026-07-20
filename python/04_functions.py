# 1. 定义与调用
def greet(name):
    print(f"Hello, {name}!")

greet("Python")

# 2. 默认参数
def power(base, exp=2):
    return base ** exp

print(power(3), power(3, 3))

# 3. 可变参数
def total(*args):
    return sum(args)

print(total(1, 2, 3, 4))

# 4. 关键字参数
def profile(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

profile(name="Alice", age=30, city="Beijing")

# 5. 返回值 - 多值返回
def min_max(lst):
    return min(lst), max(lst)

lo, hi = min_max([3, 1, 4, 1, 5, 9])
print(lo, hi)

# 6. 闭包
def make_counter(start=0):
    count = start
    def increment():
        nonlocal count
        count += 1
        return count
    return increment

counter = make_counter(10)
print(counter(), counter(), counter())

# 7. 匿名函数 (lambda)
square = lambda x: x ** 2
add = lambda a, b: a + b
print(square(5), add(3, 4))

# 8. lambda 配合高阶函数
items = [(1, "b"), (3, "a"), (2, "c")]
sorted_items = sorted(items, key=lambda x: x[1])
print(sorted_items)

# 9. 递归
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))

# 10. 类型注解
def add_numbers(a: int, b: int) -> int:
    return a + b

print(add_numbers(3, 5))
