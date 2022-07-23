import { remote } from "~/composables"

export function getUserProperty() {
  return remote.postForm({
    url: "/account-book/user/property",
  })
}

export function getUserJoinedFamilies() {
  return remote.postForm({
    url: "/account-book/user/families/joined",
  })
}

export function getUserOwneddFamilies() {
  return remote.postForm({
    url: "/account-book/user/families/owned",
  })
}
