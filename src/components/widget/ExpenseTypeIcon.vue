<template>
  <n-avatar round color="orange">
    <i text="xl" :class="icon || 'i-carbon:wallet'"></i>
  </n-avatar>
</template>

<script setup>
defineProps({
  icon: String,
});
</script>

<style lang="scss" scoped></style>
