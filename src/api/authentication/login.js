import { remote } from "~/composables"

export function loginByPhone({
  phone, password
}) {
  return remote.postForm({
    url: "/accountbook/authentication/login",
    data: {
      phone, password
    }
  })
}
