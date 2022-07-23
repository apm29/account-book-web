<template>
  <ScrollableContent>
    <ListSkeleton :loading="loading">
      <n-list v-if="pagedData && pagedData.lenngth"></n-list>
    </ListSkeleton>
  </ScrollableContent>
</template>

<script setup>
import { selectPagedFamily } from "@/api/family";
import { unref } from "vue";

const familyName = ref();
const loading = ref(true);
const total = ref(0);
const pageNo = ref(1);
const pageSize = ref(30);
const pagedData = ref([]);
async function getPagedData({ refresh } = {}) {
  if (refresh) {
    total.value = 0;
    pageNo.value = 1;
    pagedData.value = [];
  }
  loading.value = true;
  const { data } = await selectPagedFamily({
    familyName: unref(familyName),
    pageNo: unref(pageNo),
    pageSize: unref(pageSize),
  }).finally(() => (loading.value = false));
  pagedData.value = data.content || [];
  total.value = data.totalElements;
}
onMounted(getPagedData);
</script>

<style lang="scss" scoped></style>

<route>
{
  "name":"BudgetIndex"
}
</route>
