# 标准设定
key_length = 10
data_length = 8
# 转换装置设定
P10 = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6]
P8 = [6, 3, 7, 4, 8, 5, 10, 9]
# 初始置换盒
IP = [2, 6, 3, 1, 4, 8, 5, 7]
# 最终置换盒
IP1 = [4, 1, 3, 5, 7, 2, 8, 6]
# 轮函数F
EPBox = [4, 1, 2, 3, 2, 3, 4, 1]
SBox1 = [
    [1, 0, 3, 2],
    [3, 2, 1, 0],
    [0, 2, 1, 3],
    [3, 1, 0, 2]
]
SBox2 = [
    [0, 1, 2, 3],
    [2, 3, 1, 0],
    [3, 0, 1, 2],
    [2, 1, 0, 3]
]
SPBox = [2, 4, 3, 1]


# 基础操作函数
# 密钥生成
def generate_keys(key, p10, p8):
    # 置换输入密钥，生成 P10 密钥
    p10_key = ''
    for i in p10:
        p10_key += key[i - 1]

    # 生成第一个子密钥
    # 1、对 P10 密钥（p10_key）左移 1 位
    left_half = p10_key[:5]
    right_half = p10_key[5:]
    shifted_left = left_half[1:] + left_half[:1]
    shifted_right = right_half[1:] + right_half[:1]
    shifted_key1 = shifted_left + shifted_right
    # 2、进行第一次压缩置换，生成k1
    key1 = ''
    for i in p8:
        key1 += shifted_key1[i - 1]

    # 生成第二个子密钥
    # 1、对第一个子密钥（shifted_key1）左移 1 位
    left_half1 = shifted_key1[:5]
    right_half1 = shifted_key1[5:]
    shifted_left1 = left_half1[1:] + left_half1[:1]
    shifted_right1 = right_half1[1:] + right_half1[:1]
    shifted_key2 = shifted_left1 + shifted_right1
    # 2、进行第二次压缩置换，生成k1
    key2 = ''
    for i in p8:
        key2 += shifted_key2[i - 1]
    # 得到两个生成的子密钥k1,k2
    return key1, key2


# 轮函数F
def f(right_half, ki):
    # 1、进行EPBox扩展置换
    expanded = ''
    for i in EPBox:
        expanded += right_half[i - 1]
    # 2、与轮密钥ki进行亦或操作
    xored = int(expanded, 2) ^ int(ki, 2)
    xored_str = format(xored, '08b')  # 转换为二进制字符串

    # 3、进行S-Box压缩替换（根据所在行列进行定位）
    s0_input = xored_str[:4]
    s1_input = xored_str[4:]
    s0_row = int(s0_input[0] + s0_input[3], 2)  # 计算 S-box 0 的行
    s0_col = int(s0_input[1:3], 2)  # 计算 S-box 0 的列
    s1_row = int(s1_input[0] + s1_input[3], 2)  # 计算 S-box 1 的行
    s1_col = int(s1_input[1:3], 2)  # 计算 S-box 1 的列
    s0_output = format(SBox1[s0_row][s0_col], '02b')  # 获取 S-box 0 的输出
    s1_output = format(SBox2[s1_row][s1_col], '02b')  # 获取 S-box 1 的输出
    s_output = s0_output + s1_output  # 合并 S-box 的输出

    # 4、进行S P-box直接置换（二维置换）
    permuted_output = ''
    for i in SPBox:
        permuted_output += s_output[i - 1]

    return permuted_output
