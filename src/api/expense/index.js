import { remote } from "~/composables";

export function createExpenditureType({
  icon, expenditureName,
}) {
  return remote.postForm({
    url: "/account-book/expense/expenditureType/create",
    data: {
      icon, expenditureName,
    }
  })
}
