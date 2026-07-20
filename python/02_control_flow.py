# 1. if/elif/else
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 60:
    grade = "C"
else:
    grade = "F"
print(f"Score: {score}, Grade: {grade}")

# 2. 三元表达式
status = "pass" if score >= 60 else "fail"
print(status)

# 3. match-case (Python 3.10+)
command = "quit"
match command:
    case "start":
        print("Starting")
    case "stop":
        print("Stopping")
    case "quit":
        print("Quitting")
    case _:
        print("Unknown")

# 4. for 循环
for i in range(5):
    print(i, end=" ")
print()

# 5. while 循环
count = 0
while count < 3:
    count += 1
print(f"count = {count}")

# 6. 迭代容器
fruits = ["apple", "banana", "cherry"]
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# 7. break
for i in range(10):
    if i == 5:
        break
print(f"broke at i = {i}")

# 8. continue
for i in range(5):
    if i == 2:
        continue
    print(i, end=" ")
print()

# 9. try/except/finally
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Caught: {e}")
finally:
    print("cleanup done")

# 10. 多异常捕获与 else
try:
    val = int("42")
except (ValueError, TypeError) as e:
    print(f"Error: {e}")
else:
    print(f"Success: {val}")
finally:
    print("done")

# 11. 自定义异常
class MyError(Exception):
    pass

try:
    raise MyError("something went wrong")
except MyError as e:
    print(e)
