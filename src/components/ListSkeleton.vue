<template>
  <transition name="fade">
    <n-space vertical p="x-4 y-6" size="large" v-if="loading">
      <template v-for="_ in 3">
        <div flex="~" gap="4">
          <n-skeleton height="120px" circle />
          <div flex="grow" space="y-3">
            <n-skeleton height="40px" round />
            <n-skeleton text :repeat="2" /> <n-skeleton text style="width: 60%" />
          </div>
          <n-space>
            <n-skeleton text :repeat="3" />
          </n-space>
        </div>
      </template>
    </n-space>
    <slot v-else></slot>
  </transition>
</template>

<script setup>
defineProps({
  loading: Boolean,
});
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
