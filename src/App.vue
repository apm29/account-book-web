<template>
  <n-config-provider
    :locale="zhCN"
    :theme="!isDark ? darkTheme : lightTheme"
    :date-locale="dateZhCN"
  >
    <router-view />
  </n-config-provider>
</template>
<script setup>
import { isDark } from "~/composables";
import { darkTheme, lightTheme } from "naive-ui";
import { zhCN, dateZhCN } from "naive-ui";
</script>
