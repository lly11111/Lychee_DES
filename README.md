# 开发手册&用户指南

该系统是我们“荔枝”团队为用户设计的一款简单、开源的DES算法加解密系统，能够满足用户简单的加解密需要（二进制加解密和ASCII码字符串加解密），同时可以帮助用户在已知明密文的条件下暴力破解出密钥，以及向用户展示DES算法的雪崩效应。

同时，也欢迎广大程序设计与编码工作者继续完善该加密系统。如有任何疑问和建议，欢迎联系我们团队（Email：[1635487611@qq.com](mailto:1635487611@qq.com)）。


## **开发者团队**

* **开发者队名：** 荔枝

* **开发者姓名：** 张芷芮、刘俐莹

* **联系信息：**[1635487611@qq.com](mailto:1635487611@qq.com)

## **开发环境**

3.1.1 开发工具

* 集成开发化境（IDE）：PyCharm 2023.3

* 版本控制：Github

3.1.2 技术栈

* 前端语言&框架：HTML5，CSS3，JavaScript，jQuery

* 后端技术：语言：Python

* 框架：Flask框架

* Web浏览器：Microsoft Edge

## **运行**

```bash
main.py
```

## **网址与端口号**

该系统在[http://127.0.0.1:6606](http://127.0.0.1:6606)上运行


## **基础功能及界面**

* **启动动画**
![启动动画](https://i-blog.csdnimg.cn/direct/7734c0d2641d428eafcec6cebef2aa80.png#pic_center)
* **原理讲解页面**
![原理讲解](https://i-blog.csdnimg.cn/direct/70cbce4272ff4c1cb91d616e40346ff6.png#pic_center)
* **二进制加密页面**
![二进制加密](https://i-blog.csdnimg.cn/direct/b57b3982a2614bf9b05340501c33a1e9.png#pic_center)
![查看标准](https://i-blog.csdnimg.cn/direct/698c2d560e5841ebb83616df0e7aee64.png#pic_center)
* **ASCII码加密页面**
![ASCII码加密](https://i-blog.csdnimg.cn/direct/98fba6ca5265441199d1f5db896dc435.png#pic_center)
* **暴力破解页面**
![暴力破解](https://i-blog.csdnimg.cn/direct/32d73daeae20481eb64b115142a63457.png#pic_center)
* **雪崩效应页面**
![雪崩效应](https://i-blog.csdnimg.cn/direct/89d6501f85da4d83bf29c47e8d211af8.png#pic_center)

## **文件结构**
* 测试结果.pdf：存放1-5关的通关结果
* 开发手册与用户指南：存放具体开发环境、代码逻辑、系统功能介绍等
* static文件夹：存放图片、js文件和css样式表等
* templates文件夹：存放html文件

* data.py文件：存放标准加解密数据和两个基础函数

* main.py文件：存放连接前后端的路由

* bit_encryption.py文件：存放二进制加密算法

* bit_decryption.py文件：存放二进制解密算法

* ascii_encryption.py文件：存放ASCII码的加密算法

* ascii_decryption.py文件：存放ASCII码的解密算法

* force.py文件：存放暴力破解的算法
