from flask import Flask, render_template, request, jsonify
from ascii_encryption import encrypt_string
from ascii_decryption import decrypt_string
from bit_encryption import encrypt
from force import *

# 使用Flask框架
app = Flask(__name__)


# flask框架中的默认初始页面（begin页）
@app.route('/')
def index():
    return render_template('begin.html')


# flask框架中的页面跳转（跳转至app页面）
@app.route('/app')
def app_page():
    return render_template('app.html')


# 通过Web API将JS文件中的请求发送到后端服务
# 8 bit加密
@app.route('/encrypt', methods=['POST'])
def encrypt_endpoint():
    data = request.json
    plaintext = data['plaintext']
    key = data['key']
    encrypted = encrypt(plaintext, key)
    return jsonify({'encrypted': encrypted})


# 8 bit解密
@app.route('/decrypt', methods=['POST'])
def decrypt_endpoint():
    data = request.json
    ciphertext = data['ciphertext']
    key = data['key']
    decrypted = decrypt(ciphertext, key)
    return jsonify({'decrypted': decrypted})


# ASCII加密
@app.route('/encrypt1', methods=['POST'])
def encrypt1_endpoint():
    data = request.json
    cleartext = data['cleartext']
    key = data['key']
    encrypted = encrypt_string(cleartext, key)
    return jsonify({'encrypted': encrypted})


# ASCII解密
@app.route('/decrypt1', methods=['POST'])
def decrypt1_endpoint():
    data = request.json
    encrypted_string = data['ciphertext']
    key = data['key']
    decrypted = decrypt_string(encrypted_string, key)
    return jsonify({'decrypted': decrypted})


# 暴力破解
@app.route('/force', methods=['POST'])
def decrypt_route():
    data = request.get_json()
    plaintext = data['plaintext']
    ciphertext = data['ciphertext']
    brute_force_decrypt = force()
    result = brute_force_decrypt.decrypt(plaintext, ciphertext)
    return jsonify(result)


if __name__ == '__main__':
    app.run(port=6606, debug=True)
