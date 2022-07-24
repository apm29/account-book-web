import { remote } from "~/composables"

export function getMyProperty() {
  return remote.postForm({
    url: "/account-book/property/mine",
  })
}
