# 1. 列表 - 创建与基本操作
nums = [1, 2, 3, 4, 5]
nums.append(6)
nums.insert(0, 0)
nums.remove(3)
popped = nums.pop()
print(nums, popped)

# 2. 列表 - 切片
a = [0, 1, 2, 3, 4, 5]
print(a[1:4], a[:3], a[3:], a[::2], a[::-1])

# 3. 列表 - 推导式
squares = [x ** 2 for x in range(6)]
evens = [x for x in range(10) if x % 2 == 0]
print(squares, evens)

# 4. 字典 - 创建与操作
person = {"name": "Alice", "age": 30}
person["email"] = "alice@example.com"
person.update({"age": 31, "city": "Beijing"})
del person["email"]
print(person, person.get("phone", "N/A"))

# 5. 字典 - 推导式
word_len = {w: len(w) for w in ["hello", "world", "hi"]}
print(word_len)

# 6. 字典 - 遍历
for key, value in person.items():
    print(f"{key}: {value}")

# 7. 集合
s1 = {1, 2, 3, 4}
s2 = {3, 4, 5, 6}
print(s1 | s2, s1 & s2, s1 - s2, s1 ^ s2)

# 8. 元组
point = (3, 4)
x, y = point
single = (42,)
print(point, x, y, single)

# 9. 栈 (用列表模拟)
stack = []
stack.append("a")
stack.append("b")
stack.append("c")
top = stack.pop()
print(f"stack: {stack}, popped: {top}")

# 10. 队列 (用 collections.deque)
from collections import deque
queue = deque()
queue.append("a")
queue.append("b")
queue.append("c")
front = queue.popleft()
print(f"queue: {list(queue)}, dequeued: {front}")
