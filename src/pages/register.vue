<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <button btn @click="router.back">Back</button>
</template>

<route>
{
  "name": "Register"
}
</route>
