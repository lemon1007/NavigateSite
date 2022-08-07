const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);
// 建立哈希表，储存网站信息
const hashMap = xObject || [
    { logo: 'A', logoType: 'text', url: 'https://www.acfun.cn' },
    { logo: 'B', logoType: 'text', url: 'https://www.bilibili.cn' },
    { logo: 'S', logoType: 'text', url: 'https://www.sina.com.cn' },
    { logo: 'B', logoType: 'text', url: 'https://www.baidu.com' },
    { logo: 'J', logoType: 'text', url: 'https://www.jianshu.com' },
]

// 去除显示连接前缀
const simplifyUrl = (url) => {
    // 删除/开头的内容
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace('/', '')
}

const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        // 添加网址
        const $li = $(`
            <li>
                <div class="site">
                    <div class="logo">${node.logo[0]}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                </div>
            </li>
        `
        ).insertBefore($lastLi);

        $li.on('click', () => {
            window.open(node.url)
        })

        // 删除网址
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1);
            render();
        })
    })
};
render();

$('.addButton').on('click', () => {
    let url = window.prompt('请输入需要新增的网址：')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url;
    };
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        logoType: 'text',
        url: url
    });
    render();
})


window.onbeforeunload = () => {
    // JSON.stringify可以将一个对象变成字符串
    const string = JSON.stringify(hashMap);
    // 在本地localStorage里设置一个x，他的内容就是string
    localStorage.setItem('x', string);
}


// 键盘监听
// $(document).on('keypress', (e) => {
//     const { key } = e;
//     for (let i = 0; i < hashMap.length; i++) {
//         if (hashMap[i].logo.toLowerCase() === key) {
//             window.open(hashMap[i].url)
//         }
//     }
// })