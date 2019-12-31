/**
 *  全局 store 操作方法
 *
 *  store :  sessionStorage 、 localStorage、cookie
 *  params: key 值
 *  type 是类型，sessionStorage 、 localStorage、cookie三选一
 *  day 此参数只在type === cookie 的时候存在
 */
function saveWithKey (type, params, val, day = 7) {
  if (type === 'localStorage') localStorage.setItem(params, val)
  if (type === 'sessionStorage') sessionStorage.setItem(params, val)
}

function getWithKey (type, params, day = 7) {
  if (type === 'localStorage') return localStorage.getItem(params)
  if (type === 'sessionStorage') return sessionStorage.getItem(params)
}

function clearWithKey (type, params) {
  if (type === 'localStorage') localStorage.removeItem(params)
  if (type === 'sessionStorage') sessionStorage.removeItem(params)
}
export default {
  saveWithKey,
  getWithKey,
  clearWithKey
}
