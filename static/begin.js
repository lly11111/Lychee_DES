window.onload = function() {
    const intro = document.getElementById('intro');

    // 等待动画结束后进入主页面
    setTimeout(() => {
        window.location.href = "/app";
    }, 3500); // 图片显示时间 + 文字显示时间 + 2秒退出时间
};