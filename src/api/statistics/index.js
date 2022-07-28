import { remote } from "~/composables"

export function findMonthlyExpenseView({ yearMonth }) {
  return remote.postForm({
    url: "/account-book/statistics/monthly/expense",
    data: { yearMonth }
  })
}

export function findMonthlyBudgetExpenseView({ yearMonth }) {
  return remote.postForm({
    url: "/account-book/statistics/monthly/budgetAndExpense",
    data: { yearMonth }
  })
}
