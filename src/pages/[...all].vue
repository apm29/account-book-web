<script setup>
const router = useRouter();
</script>

<template>
  <main p="x4 y10" text="center teal-700 dark:gray-200" bg-surface h-screen>
    <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
      <template #footer>
        <n-button @click="router.back()">找点乐子吧</n-button>
      </template>
    </n-result>
  </main>
</template>

<route>
{
  "name":"NotFound"
}
</route>
