<template>
  <n-scrollbar style="height: calc(100vh - 55px)">
    <div p="x-3 y-3" space="y-5">
      <MonthlyBill />
      <MonthlyBudget />
      <MonthlyExpense />
    </div>
  </n-scrollbar>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>
<route>
{
  "name": "Home"
}
</route>
