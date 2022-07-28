<template>
  <h1
    text="2xl"
    flex="~"
    items="center"
    gap="x-2"
    cursor="default"
    @click="handleAppClick"
  >
    <n-avatar round h="6" src="/logo.png"></n-avatar>
    {{ AppTitle }}
  </h1>
</template>

<script setup>
import { useRouter } from "vue-router";
import { AppTitle } from "~/composables";
const props = defineProps({
  linker: {
    type: Boolean,
  },
});
const handleAppClick = computed(() => (props.linker ? routerToHome : null));
const router = useRouter();
function routerToHome() {
  router.push({
    name: "Home",
  });
}
</script>
