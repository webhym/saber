//提供了用户信息（token）操作相关函数
//使用sessionStorage 存储用户信息
//约定：
//key 是 hm-touxiao-pc-user
// value 是 json字串符
const KEY = 'hm-toutiao-pc-user'
//存储用户信息
const setUser = (user) => {
    window.sessionStorage.setItem(KEY, JSON.stringify(user));
}
// 获取用户信息
const getUser = () => {
    //考虑有可能之前未存储过用户信息，获取到的值为null
    //返回：最好是对象，需要转换成对象，所以如果没有获取到值，默认一个 {} 对象即可
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
}
// 删除用户信息
const delUser = () => {
    window.sessionStorage.removeItem(KEY);
}
//导出以上三个函数
export default {
    setUser,
    getUser,
    delUser
}