# Python 的核心数据类型主要分为两大类：不可变类型和可变类型。在 Python 中，一切皆为对象，变量仅仅是指向对象的引用
# 不可变数据（4 个）：Number（数字）、String（字符串）、bool（布尔）、Tuple（元组）
# 可变数据（3 个）：List（列表）、Dictionary（字典）、Set（集合）

# number  int、float、bool、complex（复数）
a, b, c, d = 20, 5.5, True, 4+3j
print('number',type(a), type(b), type(c), type(d))

# string
s = "Hello, World!"
print('string',type(s))

# bool
print('bool',type(True),type(False))

# List 
l = [1, 2, 3, 4, 5]
print('List',type[int](l))

# tuple
t = (1, 2, 3, 4, 5)
print('tuple',type(t))

# set 
s = {1, 2, 3, 4, 5}
print('set',type(s))

# dictionary
d = {'a': 1, 'b': 2, 'c': 3}
print('dictionary',type(d))

# none
print(None,type(None))

# bytes
print('bytes',type(b'hello'),type(bytes('hello', encoding='utf-8')))
