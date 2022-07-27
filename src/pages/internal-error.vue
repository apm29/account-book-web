<template>
  <div h="screen" w="screen" flex="~" items="center" justify="center">
    <n-result
      status="500"
      title="500 服务器错误"
      :description="$route.query.error || '服务器出错可能说明该雇更多程序员了'"
      max-w="80vw"
    >
      <template #footer>
        <n-space justify="center">
          <n-button @click="$router.replace({ name: 'Home' })">去首页</n-button>
          <n-button @click="$router.replace({ name: 'Login' })">重新登录</n-button>
        </n-space>
      </template>
    </n-result>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
<route>
{
  "name":"InternalError"
}
</route>
