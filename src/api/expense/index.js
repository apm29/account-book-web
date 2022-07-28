import { remote } from "~/composables";

export function createExpenditureType({ icon, expenditureName }) {
  return remote.postForm({
    url: "/account-book/expense/expenditureType/create",
    data: {
      icon,
      expenditureName,
    },
  });
}

export function createExpenditure({ amount, expenditureTypeId, remark,
  createTime }) {
  return remote.postForm({
    url: "/account-book/expense/expenditure/create",
    data: {
      amount, expenditureTypeId, remark,
      createTime
    },
  });
}
export function createIncome({ amount, incomeTypeId, remark, createTime }) {
  return remote.postForm({
    url: "/account-book/expense/income/create",
    data: {
      amount, incomeTypeId, remark,
      createTime
    },
  });
}
export function updateExpense({
  amount,
  remark,
  expenseTypeId,
  expenseType,
  expenseId,
  createTime
}) {
  return remote.postForm({
    url: "/account-book/expense/update",
    data: {
      amount,
      remark,
      expenseTypeId,
      expenseType,
      expenseId,
      createTime
    },
  });
}

export function deleteExpense({
  expenseType,
  expenseId,
}) {
  return remote.postForm({
    url: "/account-book/expense/delete",
    data: {
      expenseType,
      expenseId,
    },
  });
}

export function findMonthlyExpenseView({
  yearMonth
}) {
  return remote.postForm({
    url: "/account-book/expense/monthly/statistics",
    data: { yearMonth }
  })
}

export function findMonthlyGrouedExpenseView({
  yearMonth
}) {
  return remote.postForm({
    url: "/account-book/expense/monthly/grouped-statistics",
    data: { yearMonth }
  })
}
