from bit_encryption import encrypt

# ASCII码的加密算法
def encrypt_string(ascii_string, key):
    # 将ASCII字符串转换为二进制数据
    binary_string = ASCII_to_Binary(ascii_string)
    # 初始化加密结果
    encrypted_string = ""
    # 8位一组进行加密
    for i in range(0, len(binary_string), 8):
        plaintext = binary_string[i:i + 8]
        # 执行加密算法
        ciphertext = encrypt(plaintext, key)
        encrypted_string += ciphertext
    return encrypted_string

def ASCII_to_Binary(ASCII_string):
    binary = ""
    for character in ASCII_string:
        # 使用zfill填充0，确保每个字符都转换为8位二进制数
        binary += bin(ord(character))[2:].zfill(8)
    return binary

