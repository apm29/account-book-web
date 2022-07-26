import { remote } from "~/composables";

export function getPagedBudgets({ budgetTitle, pageNo, pageSize }) {
  return remote.postForm({
    url: "/account-book/budget/selectPaged",
    data: { budgetTitle, pageNo, pageSize },
  });
}

export function searchBudgetTemplate(budgetTemplateTitle) {
  return remote.postForm({
    url: "/account-book/budget/template/search",
    data: { budgetTemplateTitle },
  });
}

export function createBudgetFromTemplate({ budgetTemplateId, budgetTitle, yearMonth }) {
  return remote.postForm({
    url: "/account-book/budget/creatFromTemplate",
    data: { budgetTemplateId, budgetTitle, yearMonth },
  });
}

export function saveBudgetDetail({
  budgetDetailId,
  budgetId,
  budgetExpenditureTypeId,
  budgetNumber,
  remark,
}) {
  return remote.postForm({
    url: "/account-book/budget/detail/save",
    data: {
      budgetDetailId,
      budgetId,
      budgetExpenditureTypeId,
      budgetNumber,
      remark,
    },
  });
}

export function deleteBudgetDetail(budgetDetailId) {
  return remote.postForm({
    url: "/account-book/budget/detail/delete",
    data: {
      budgetDetailId,
    },
  });
}

export function deleteBudget(budgetId) {
  return remote.postForm({
    url: "/account-book/budget/delete",
    data: {
      budgetId,
    },
  });
}

export function findBudgetById(budgetId) {
  return remote.postForm({
    url: "/account-book/budget/findById",
    data: {
      budgetId,
    },
  });
}


export function createBudget(budget) {
  return remote.postJson({
    url: "/account-book/budget/create",
    data: budget,
  });
}
