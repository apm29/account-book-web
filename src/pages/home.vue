<template>
  <n-scrollbar style="height: calc(100vh - 55px)">
    <div p="x-6 y-5" space="y-5">
      <MonthlyBill />
      <MonthlyBudget />
      <MonthlyExpense />
      <Property />
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
