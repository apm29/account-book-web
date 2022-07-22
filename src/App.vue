<template>
  <n-config-provider
    :locale="zhCN"
    :theme="isDark ? darkTheme : lightTheme"
    :date-locale="dateZhCN"
  >
    <n-global-style />
    <n-loading-bar-provider>
      <n-notification-provider>
        <n-message-provider>
          <Content />
        </n-message-provider>
      </n-notification-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
<script setup>
import { isDark } from "~/composables";
import { darkTheme, lightTheme } from "naive-ui";
import { zhCN, dateZhCN } from "naive-ui";
</script>
