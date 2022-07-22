<template>
  <n-popover trigger="hover" placement="bottom">
    <template #trigger>
      <n-button circle tertiary type="primary" @click="toggleDark">
        <div i="carbon-sun dark:carbon-moon" />
      </n-button>
    </template>
    {{ isDark ? "深色模式" : "浅色模式" }}
  </n-popover>
</template>
<script setup>
import { toggleDark, isDark } from "~/composables";
</script>
