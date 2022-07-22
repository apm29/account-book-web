import { remote } from "~/composables"

export function loginByPhone({
  phone, password
}) {
  return remote.postForm({
    url: "/account-book/authentication-web/user/loginByPhone",
    data: {
      phone, password
    }
  })
}

export function registerByPhone({
  phone, captcha
}) {
  return remote.postForm({
    url: "/account-book/authentication-web/user/registerByPhone",
    data: {
      phone, captcha
    }
  })
}



export function getUserInfo() {
  return remote.postForm({
    url: "/account-book/user/getUserInfo",
  })
}
