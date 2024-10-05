from bit_decryption import decrypt
# ASCII码的解密算法
def decrypt_string(encrypted_string, key):
    # 初始化解密结果
    decrypted_string = ""
    # 8位一组进行解密
    for i in range(0, len(encrypted_string), 8):
        ciphertext = encrypted_string[i:i + 8]
        # 执行解密算法
        plaintext = decrypt(ciphertext, key)
        decrypted_string += plaintext
    return decrypted_string

def Binary_to_ASCII(binary):
    ASCII = ""
    for i in range(0, len(binary), 8):
        # chr函数将其转换为字符
        ASCII += chr(int(binary[i:i + 8], 2))
    return ASCII
