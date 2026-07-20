# 1. 变量声明与赋值
x = 10
name = "Python"
is_valid = True
a, b, c = 1, 2, 3
print(x, name, is_valid, a, b, c)

# 2. 基本数据类型 - 数值
integer_val = 42
float_val = 3.14
complex_val = 1 + 2j
print(type(integer_val), type(float_val), type(complex_val))

# 3. 基本数据类型 - 字符串
s = "Hello, Python"
print(len(s), s.upper(), s.lower(), s.split(", "))

# 4. 基本数据类型 - 布尔
t = True
f = False
print(t and f, t or f, not t)

# 5. 类型转换
print(int("42"), float("3.14"), str(100), bool(0), bool(1), list("abc"))

# 6. 运算符 - 算术
print(10 + 3, 10 - 3, 10 * 3, 10 / 3, 10 // 3, 10 % 3, 2 ** 8)

# 7. 运算符 - 比较
print(1 == 1, 1 != 2, 1 < 2, 1 > 2, 1 <= 1, 1 >= 2)

# 8. 运算符 - 逻辑与位
print(True and False, True or False, not True)
print(0b1100 & 0b1010, 0b1100 | 0b1010, 0b1100 ^ 0b1010, ~0b1100)

# 9. 注释
# 这是单行注释
"""
这是
多行注释
"""
