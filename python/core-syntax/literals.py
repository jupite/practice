# 字面量
# https://docs.python.org/3/reference/lexical_analysis.html#literals

# single/double quotes
print("eggs",'spam','Say "Hello", please.',"Don't do that!")
# backslash (\)
print("Say \"Hello\" to everyone!")
# triple quotes (""" or '''')
print("""这个字符串内有 "引号"。""",'''这个三引号字符串
在下一行继续。''')

name = "小明"
action = "学习 Python"
result = f"{name} 正在 {action}！"
print(result)
