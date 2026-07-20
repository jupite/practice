# special characters 

# none


import os
print(os.getcwd()) 


file = open('python\data-modal\致橡树.txt', 'w', encoding='utf-8')
file.write('\n标题：《致橡树》')
file.write('\n作者：舒婷')
file.write('\n时间：1977年3月')

print(file.read())
file.close()
