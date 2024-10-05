//页面切换函数：根据传入参数选择显示特定的页面
function showContent(page) {
    var contentItems = Array.from(document.querySelectorAll('.content-item'));
    contentItems.forEach(function (item) {
        item.style.display = 'none';
    });
    document.getElementById(page).style.display = 'block';
}

//8 bit加密算法（获取明文和密钥文本框）
document.querySelector('#eightBit #encrypt').addEventListener('click', function () {
    // 获取输入框的值
    var cleartext = document.querySelector('#eightBit #cleartext').value;
    var key = document.querySelector('#eightBit #key').value;

    if (cleartext.trim() === '' || key.trim() === '') {
        // 如果任何一个输入框为空，弹出alert并退出函数
        alert('输入框不能为空！');
        return;
    }

    // 发送POST请求到服务器
    fetch('/encrypt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            plaintext: cleartext,
            key: key
        })
    })
        .then(response => response.json())
        .then(data => {
            // 显示结果
            document.querySelector('#eightBit #result').value = data.encrypted;
        })
        .catch(error => console.error('Error:', error));
});

//8 bit解密算法（获取密文和密钥文本框）
document.querySelector('#eightBit #decrypt').addEventListener('click', function () {
    // 获取输入框的值
    var ciphertext = document.querySelector('#eightBit #ciphertext').value;
    var key = document.querySelector('#eightBit #key').value;

    if (ciphertext.trim() === '' || key.trim() === '') {
        // 如果任何一个输入框为空，弹出alert并退出函数
        alert('输入框不能为空！');
        return;
    }

    // 发送POST请求到服务器
    fetch('/decrypt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ciphertext: ciphertext,
            key: key
        })
    })
        .then(response => response.json())
        .then(data => {
            // 显示解密结果
            document.querySelector('#eightBit #result').value = data.decrypted;
        })
        .catch(error => console.error('Error:', error));
});


//ASCII码加密算法（获取明文和密钥文本框）
document.querySelector('#string #encrypt').addEventListener('click', function () {
    // 获取输入框的值
    var cleartext = document.querySelector('#string #cleartext').value;
    var key = document.querySelector('#string #key').value;

    if (cleartext.trim() === '' || key.trim() === '') {
        // 如果任何一个输入框为空，弹出alert并退出函数
        alert('输入框不能为空！');
        return;
    }

    // 发送POST请求到服务器
    fetch('/encrypt1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cleartext: cleartext,
            key: key
        })
    })
        .then(response => response.json())
        .then(data => {
            var encryptedText = data.encrypted; // 二进制形式的加密结果
            // 转换二进制到ASCII
            var asciiText = binaryToASCII(encryptedText);
            // 设置显示内容
            document.querySelector('#string #result').value =
                '二进制：' + encryptedText + '\n' +
                'ASCII码：' + asciiText;
        })
        .catch(error => console.error('Error:', error));
});
//二进制转换ASCII码函数：ASCII码加解密算法调用该函数
function binaryToASCII(binaryString) {
    let ascii = '';
    // 每8个字符作为一组
    for (let i = 0; i < binaryString.length; i += 8) {
        // 获取当前8位的二进制子串
        const byte = binaryString.substr(i, 8);
        // 将二进制转为十进制并转换为对应的ASCII字符
        ascii += String.fromCharCode(parseInt(byte, 2));
    }
    return ascii;
}

//ASCII码解密算法（获取密文和密钥文本框）
document.querySelector('#string #decrypt').addEventListener('click', function () {
    // 获取输入框的值
    var ciphertext = document.querySelector('#string #ciphertext').value;
    var key = document.querySelector('#string #key').value;

    if (ciphertext.trim() === '' || key.trim() === '') {
        // 如果任何一个输入框为空，弹出alert并退出函数
        alert('输入框不能为空！');
        return;
    }

    // 发送POST请求到解密服务器
    fetch('/decrypt1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ciphertext: ciphertext,
            key: key
        })
    })
        .then(response => response.json())
        .then(data => {
            var decryptedText = data.decrypted; // 二进制形式的加密结果
            // 转换二进制到ASCII
            var asciiText = binaryToASCII(decryptedText);
            // 设置显示内容
            document.querySelector('#string #result').value =
                '二进制：' + decryptedText + '\n' +
                'ASCII码：' + asciiText;
        })
        .catch(error => console.error('Error:', error));
});
//暴力破解
document.querySelector('#burteForce #burteForceButton').addEventListener('click', function() {
    // 获取输入框的值
    var cleartext = document.querySelector('#burteForce #cleartext').value;
    var ciphertext = document.querySelector('#burteForce #ciphertext').value;

    if (cleartext.trim() === '' || ciphertext.trim() === '') {
        // 如果任何一个输入框为空，弹出alert并退出函数
        alert('输入框不能为空！');
        return;
    }

    // 创建一个请求对象
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/force', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // 发送请求
    xhr.onload = function() {
        if (xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);

            // 显示单线程计算时间动画
            var singleTime = result.single_thread.time / 1000; // 转换为秒
            animateTime('#burteForce #singleThreadTime', singleTime);
            document.querySelector('#burteForce #singleThreadResult').value = ''; // 清空结果框

            // 显示多线程计算时间动画
            var multiTime = result.multi_thread.time / 1000; // 转换为秒
            animateTime('#burteForce #multiThreadTime', multiTime);
            document.querySelector('#burteForce #multiThreadResult').value = ''; // 清空结果框

            // 显示结果
            setTimeout(function() {
                var singleResult = result.single_thread.keys.join("\n");
                document.querySelector('#burteForce #singleThreadResult').value = `可能的密钥为：\n${singleResult}`;

                var multiResult = result.multi_thread.keys.join("\n");
                document.querySelector('#burteForce #multiThreadResult').value = `可能的密钥为：\n${multiResult}`;
            }, Math.max(singleTime, multiTime) * 1000);  // 确保在计算完成后更新结果

        } else {
            alert('解密失败，请重试！');
        }
    };

    // 发送 JSON 数据
    xhr.send(JSON.stringify({
        "plaintext": cleartext,
        "ciphertext": ciphertext
    }));
});
//暴力破解的动画显示
function animateTime(selector, time) {
    var element = document.querySelector(selector);
    element.value = '计算中...';
    element.style.color = 'blue'; // 设置初始颜色

    var startTime = performance.now(); // 使用高精度时间
    var interval = setInterval(function() {
        var now = performance.now();
        var elapsedTime = ((now - startTime) / 1000).toFixed(3); // 已用时间，单位为秒，保持三位小数

        if (elapsedTime >= time) {
            clearInterval(interval);
            element.value = `计算时间: ${time}s`;
            element.style.color = 'black'; // 恢复初始颜色
        } else {
            element.value = `计算中... 已用时间: ${elapsedTime}s`;
        }
    }, 50); // 每50ms更新一次
}

//清屏算法
document.addEventListener('DOMContentLoaded', (event) => {
    var clears = document.getElementsByClassName("clearButton");
    Array.prototype.forEach.call(clears, function (e) {
        e.addEventListener('click', function () {
            // 获取所有input和textarea元素
            var inputs = document.querySelectorAll('input, textarea');
            // 遍历所有input和textarea元素并清除它们的内容
            inputs.forEach(function (element) {
                element.value = ''; // 将每个元素的值设置为空字符串
            });
        });
    });
});

//雪崩效应（明文造成的雪崩效应）
document.querySelector('#avalanche .left-button').addEventListener('click', function () {
    // 获取输入框的值
    var cleartext1 = document.querySelector('#avalanche .left-input1').value;
    var cleartext2 = document.querySelector('#avalanche .left-input2').value;
    var key = document.querySelector('#avalanche .left-input3').value;
    //检验两个明文和密钥均不能为空值
    if (cleartext1.trim() === '' || key.trim() === ''||cleartext2.trim() === '') {
        alert('明文或密钥不能为空！');
        return;
    }

    // 计算明文1和明文2的二进制表示中有多少位不同（汉明距离）
    function calculateHammingDistance(bin1, bin2) {
        let distance = 0;
        for (let i = 0; i < bin1.length; i++) {
            if (bin1[i] !== bin2[i]) {
                distance++;
            }
        }
        return distance;
    }

    // 计算明文的汉明距离
    document.querySelector('#avalanche .bottom-input').value = calculateHammingDistance(cleartext1, cleartext2);
    // 创建两个加密请求并使用 Promise.all 处理
    let requests = [
        fetch('/encrypt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                plaintext: cleartext1,
                key: key
            })
        }),
        fetch('/encrypt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                plaintext: cleartext2,
                key: key
            })
        })
    ];
    // 执行所有请求
    Promise.all(requests)
        .then(responses => {
            return Promise.all(responses.map(response => response.json()));
        })
        .then(data => {
            // 显示结果
            const encrypted1 = data[0].encrypted; // 第一个加密结果
            const encrypted2 = data[1].encrypted; // 第二个加密结果
            document.querySelector('#avalanche .left-textarea').value = ` 密文1：${encrypted1} \n密文2：${encrypted2}`;
            // 计算密文的汉明距离
            document.querySelector('#avalanche .bottom-input1').value = calculateHammingDistance(encrypted1, encrypted2);
        })
        .catch(error => console.error('Error:', error));
});

//雪崩效应（密钥造成的雪崩效应）
document.querySelector('#avalanche .right-button').addEventListener('click', function () {
    // 获取输入框的值
    var cleartext = document.querySelector('#avalanche .right-input1').value;
    var key1 = document.querySelector('#avalanche .right-input2').value;
    var key2 = document.querySelector('#avalanche .right-input3').value;
    //检验明文和两个密钥均不能为空值
    if (cleartext.trim() === '' || key1.trim() === '' || key2.trim() === '') {
        // 如果任何一个输入框为空，弹出alert并退出函数
        alert('明文或密钥不能为空！');
        return;
    }

    // 计算明文1和明文2的二进制表示中有多少位不同（汉明距离）
    function calculateHammingDistance(bin1, bin2) {
        let distance = 0;
        for (let i = 0; i < bin1.length; i++) {
            if (bin1[i] !== bin2[i]) {
                distance++;
            }
        }
        return distance;
    }

    // 计算明文的汉明距离
    document.querySelector('#avalanche .bottom-input2').value = calculateHammingDistance(key1, key2);
    // 创建两个加密请求并使用 Promise.all 处理
    let requests = [
        fetch('/encrypt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                plaintext: cleartext,
                key: key1
            })
        }),
        fetch('/encrypt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                plaintext: cleartext,
                key: key2
            })
        })
    ];
    // 执行所有请求
    Promise.all(requests)
        .then(responses => {
            return Promise.all(responses.map(response => response.json()));
        })
        .then(data => {
            // 显示结果
            const encrypted1 = data[0].encrypted; // 第一个加密结果
            const encrypted2 = data[1].encrypted; // 第二个加密结果
            document.querySelector('#avalanche .right-textarea').value = ` 密文1：${encrypted1} \n密文2：${encrypted2}`;
            // 计算密文的汉明距离
            document.querySelector('#avalanche .bottom-input3').value = calculateHammingDistance(encrypted1, encrypted2);
        })
        .catch(error => console.error('Error:', error));
});