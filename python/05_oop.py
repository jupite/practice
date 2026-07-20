# 1. 类与对象
class Dog:
    species = "Canine"

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def bark(self):
        print(f"{self.name} says woof!")

dog = Dog("Buddy", 3)
dog.bark()
print(dog.species, dog.name, dog.age)

# 2. 构造与析构
class Resource:
    def __init__(self, name):
        self.name = name
        print(f"Acquired: {name}")

    def __del__(self):
        print(f"Released: {self.name}")

r = Resource("file.txt")
del r

# 3. 继承
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        raise NotImplementedError

class Cat(Animal):
    def speak(self):
        return f"{self.name} says meow"

class Dog2(Animal):
    def speak(self):
        return f"{self.name} says woof"

print(Cat("Kitty").speak(), Dog2("Rex").speak())

# 4. 多重继承与 MRO
class A:
    def greet(self):
        return "A"

class B(A):
    def greet(self):
        return "B"

class C(A):
    def greet(self):
        return "C"

class D(B, C):
    pass

print(D().greet(), D.__mro__)

# 5. 接口/协议 (abc)
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius ** 2

print(Circle(5).area())

# 6. 访问控制 (约定)
class Secret:
    def __init__(self):
        self.public = "everyone"
        self._protected = "subclass"
        self.__private = "class only"

s = Secret()
print(s.public, s._protected, s._Secret__private)

# 7. 多态
def describe(animal):
    print(animal.speak())

describe(Cat("Kitty"))
describe(Dog2("Rex"))

# 8. 运算符重载
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(1, 2)
v2 = Vector(3, 4)
print(v1 + v2)

# 9. 类方法与静态方法
class Math:
    @staticmethod
    def add(a, b):
        return a + b

    @classmethod
    def info(cls):
        return cls.__name__

print(Math.add(1, 2), Math.info())

# 10. property
class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius

    @property
    def fahrenheit(self):
        return self.celsius * 9 / 5 + 32

    @fahrenheit.setter
    def fahrenheit(self, f):
        self.celsius = (f - 32) * 5 / 9

t = Temperature(100)
print(t.fahrenheit)
t.fahrenheit = 32
print(t.celsius)

# 11. dataclass
from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float

    def distance(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5

p = Point(3, 4)
print(p, p.distance())
