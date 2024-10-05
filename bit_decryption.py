from data import *


# 解码过程
def decrypt(ciphertext, key):
    # 1、生成密钥k1 k2
    key1, key2 = generate_keys(key, P10, P8)

    # 初始置换（利用IP）
    ip_output = ''
    for i in IP:
        ip_output += ciphertext[i - 1]

    # 多轮变换部分
    # 将密文分为左右两半部分
    right_half = ip_output[:4]
    left_half = ip_output[4:]

    # 第一轮加密
    # （1）将左半部分和子密钥key2进行f操作。
    left_result = f(left_half, key2)
    # （2）将f的结果（left_result）与右半部分进行XOR操作
    left_half1_int = int(right_half, 2) ^ int(left_result, 2)
    left_half1 = format(left_half1_int, '04b')

    # 第二轮加密
    # （1）将左半部分和子密钥key1进行f操作。
    left_result = f(left_half1, key1)
    # （2）将f的结果（left_result）与左半部分进行XOR操作
    right_half1_int = int(left_half, 2) ^ int(left_result, 2)
    right_half1 = format(right_half1_int, '04b')

    # 将经过一次交换的内容合并（最后一轮不发生交换）
    final_output = right_half1 + left_half1
    # 最终置换（利用IP1）
    ip1_output = ''
    for i in IP1:
        ip1_output += final_output[i - 1]

    return ip1_output
