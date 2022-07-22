<template>
  <h1
    text="2xl"
    flex="~"
    items="center"
    gap="x-2"
    cursor="default"
    @click="link ? handleAppClick : null"
  >
    <n-image h="6" src="/logo.png"></n-image>
    {{ AppTitle }}
  </h1>
</template>

<script setup>
import { useRouter } from "vue-router";
import { AppTitle } from "~/composables";
defineProps({
  link: {
    type: Boolean,
  },
});

const router = useRouter();
function handleAppClick() {
  router.push({
    name: "Home",
  });
}
</script>
