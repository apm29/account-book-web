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


export function getUserInfo() {
  return remote.postForm({
    url: "/account-book/user/getUserInfo",
  })
}
