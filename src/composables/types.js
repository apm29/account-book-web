import { findAllExpenditureTypes } from "~/api/dict"
import { findAllIncomeTypes } from "~/api/dict"
export function useExpenditureTypes() {
  //类型字典
  const expenditureTypes = ref([]);
  const loading = ref(false);
  function getExpenditureTypes() {
    loading.value = true;
    findAllExpenditureTypes()
      .then((res) => (expenditureTypes.value = res.data))
      .finally(() => {
        loading.value = false;
      });
  }
  function getExpenditureTypeNameById(id) {
    return expenditureTypes.value.find((it) => it.id === id)?.name ?? "--";
  }
  function getExpenditureTypeIconById(id) {
    return expenditureTypes.value.find((it) => it.id === id)?.icon ?? "i-carbon:wallet";
  }
  return {
    loading,
    expenditureTypes,
    getExpenditureTypes,
    getExpenditureTypeNameById,
    getExpenditureTypeIconById
  }
}


export function useIncomeTypes() {
  //类型字典
  const incomeTypes = ref([]);
  const loading = ref(false);
  function getIncomeTypes() {
    loading.value = true;
    findAllIncomeTypes()
      .then((res) => (incomeTypes.value = res.data))
      .finally(() => {
        loading.value = false;
      });
  }
  function getIncomeTypeNameById(id) {
    return incomeTypes.value.find((it) => it.id === id)?.name ?? "--";
  }
  function getIncomeTypeIconById(id) {
    return incomeTypes.value.find((it) => it.id === id)?.icon ?? "i-carbon:wallet";
  }
  return {
    loading,
    incomeTypes,
    getIncomeTypes,
    getIncomeTypeNameById,
    getIncomeTypeIconById
  }
}
