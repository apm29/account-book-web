import { remote } from "~/composables"

export function getUserProperty() {
  return remote.postForm({
    url: "/account-book/user/property",
  })
}
