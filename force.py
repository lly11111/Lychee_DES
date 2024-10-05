import threading
import time
from bit_decryption import decrypt
from concurrent.futures import ThreadPoolExecutor, as_completed

class force:
    def __init__(self):
        self.correct_keys = []
        self.lock = threading.Lock()

    # pairs：一个包含明密文对的列表
    # start：暴力破解的起始密码
    # end：暴力破解的结束密码
    def force(self, pairs, start, end):
        local_correct_keys = []
        # 从start到end循环遍历可能的密钥
        for key in range(start, end):
            # 密钥格式化
            key_str = '{0:010b}'.format(key)
            for plaintext, ciphertext in pairs:
                decrypted = decrypt(ciphertext, key_str)
                if decrypted != plaintext:
                    break
            else:
                if len(key_str) == 10:
                    local_correct_keys.append(key_str)
        with self.lock:
            # 保存正确的密钥
            self.correct_keys.extend(local_correct_keys)

    # 单线程暴力破解，start是0，end是2的10次方
    def single_thread_force(self, pairs):
        self.force(pairs, 0, 2 ** 10)
        return self.correct_keys

    # 多线程暴力破解，均分任务
    def multi_thread_force(self, pairs, num_threads):
        key_space = 2 ** 10
        step = key_space // num_threads

        futures = []
        # 通过线程池管理线程，减少创建和销毁线程的开销。最大线程为num_threads
        with ThreadPoolExecutor(max_workers=num_threads) as executor:
            for i in range(num_threads):
                start = i * step
                end = start + step if i < num_threads - 1 else key_space
                futures.append(executor.submit(self.force, pairs, start, end))

        for future in as_completed(futures):
            future.result()

        return self.correct_keys

    def decrypt(self, plaintext_str, ciphertext_str):
        # 分割输入字符串，用于有多组明密文的情况
        plaintexts = plaintext_str.split(",")
        ciphertexts = ciphertext_str.split(",")

        # 创建明密文对。zip:将明文列表和密文列表配对
        pairs = list(zip(plaintexts, ciphertexts))

        # 单线程暴力破解计算时间
        start_time = time.time()
        single_result = self.single_thread_force(pairs)
        single_time = time.time() - start_time

        # 清空密钥列表（否则会显示两遍）
        self.correct_keys.clear()

        # 多线程暴力破解计算时间
        start_time = time.time()
        multi_result = self.multi_thread_force(pairs, num_threads=4)
        multi_time = time.time() - start_time

        # 分别得到单线程和多线程暴力破解的各项值
        return {
            "single_thread": {
                "keys": single_result,
                "time": single_time
            },
            "multi_thread": {
                "keys": multi_result,
                "time": multi_time,
                "num_threads": 4
            }
        }
