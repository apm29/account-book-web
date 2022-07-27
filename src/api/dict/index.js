import { remote } from "~/composables";

export function findAllExpenditureTypes() {
  return remote.postForm({
    url: "/account-book/expense/expenditureTypes/findAll",
  });
}

export function findAllIncomeTypes() {
  return remote.postForm({
    url: "/account-book/expense/incomeTypes/findAll",
  });
}
