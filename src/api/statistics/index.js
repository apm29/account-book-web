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

export function findMonthlyGroupedByDayExpenseView({
  yearMonth, expenseType
}) {
  return remote.postForm({
    url: "/account-book/statistics/monthly/grouped-by-day-statistics",
    data: { yearMonth, expenseType }
  })
}


export function findAnnuallyGroupedByMonthExpenseView({
  year, expenseType
}) {
  return remote.postForm({
    url: "/account-book/statistics/annually/grouped-by-month-statistics",
    data: { year, expenseType }
  })
}

