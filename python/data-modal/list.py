list1 = [1, 2, 3 ]
list2 = ['a', 'b', 'c' ]
# 列表的运算 english: list operations
print(list1+list2, list1*2)

# 查询 list query
list1.index(2)
list1.count(2)
print(
    list1.index(2), 
    list1.count(2),
    list1,
    5 in list1,
    5 not in list1,
    list1[0],
    list1[1:3],
    )

# 修改 list modification
list1[0] = 100
print(list1)
list1.append(4)
print(list1)
list1.insert(2,400)
print(list1)
list1.extend(list2)
print(list1)

# 删除 list deletion
list1.remove(400)
print("删除400", list1)
list1.pop(0)
print(list1)

# 元素遍历 list iteration
for item in list1:
    print(item)
for index, item in enumerate(list1):   
    print(index, item)

