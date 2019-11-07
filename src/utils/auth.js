import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  var Token = Cookies.get(TokenKey);
  return Token
}
export function setToken(token) {
  return Cookies.set(TokenKey, token, {
    expires: 1
  })
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getCookies(name) {
  return Cookies.get(name)
}
export function setCookies(name, value) {
  return Cookies.set(name, value, {
    expires: 1
  })
}
export function removeCookies(name) {
  return Cookies.remove(name)
}
