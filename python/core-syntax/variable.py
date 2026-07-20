# 变量
# https://docs.python.org/3/reference/lexical_analysis.html#variables       

import literals
counter: int = 100 # 赋值整型变量
miles = 1000.0 # 浮点型
name = "John" # 字符串
 
counter = 'dd'
print(counter,len(counter))

height = float(input('身高(cm)：'))
weight = float(input('体重(kg)：'))
bmi = weight / (height / 100) ** 2
print(f'{bmi = :.1f}')
if 18.5 <= bmi < 24:
    print('你的身材很棒！')