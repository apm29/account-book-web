<template>
  <ScrollableContent>
    <div p="x-6 y-5" space="y-5">
      <MonthlyBill />
      <MonthlyBudget />
      <MonthlyExpense />
      <Property />
    </div>
  </ScrollableContent>
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
