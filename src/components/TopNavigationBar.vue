<template>
  <div
    v-if="userInfo"
    flex="~"
    items="center"
    p="x-3 t-2"
    border="b gray-500/50"
    gap="x-3"
    h="55px"
  >
    <AppTitle></AppTitle>
    <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
    <div flex="grow"></div>
    <n-input
      placeholder="搜索类别/备注"
      type="text"
      size="small"
      round
      w="!10rem"
      h="1.75rem"
    >
      <template #prefix>
        <i i-carbon:search />
      </template>
    </n-input>
    <DarkToggle></DarkToggle>
    <UserInfo />
  </div>
</template>

<script setup>
import UserInfo from "./UserInfo.vue";
import { useAppStore } from "@/store";

const appStore = useAppStore();
const userInfo = computed(() => appStore.userInfo);
function renderIcon(icon) {
  return () => h("i", { class: icon });
}

const activeKey = ref();

const menuOptions = [
  {
    label: "账单",
    key: "bill",
    icon: renderIcon("i-carbon:money"),
  },
  {
    label: "预算",
    key: "budget",
    icon: renderIcon("i-carbon:wallet"),
    children: [
      {
        label: "鼠",
        key: "rat",
      },
    ],
  },
  {
    label: "资产",
    key: "assets",
    icon: renderIcon("i-carbon:manage-protection"),
  },
  {
    label: "更多",
    key: "dance-dance-dance",
    icon: renderIcon("i-carbon:overflow-menu-vertical"),
    children: [
      {
        type: "group",
        label: "人物",
        key: "people",
        children: [
          {
            label: "叙事者",
            key: "narrator",
            icon: renderIcon("i-carbon:add"),
          },
          {
            label: "羊男",
            key: "sheep-man",
            icon: renderIcon("i-carbon:add"),
          },
        ],
      },
      {
        label: "饮品",
        key: "beverage",
        icon: renderIcon("i-carbon:add"),
        children: [
          {
            label: "威士忌",
            key: "whisky",
          },
        ],
      },
      {
        label: "食物",
        key: "food",
        children: [
          {
            label: "三明治",
            key: "sandwich",
          },
        ],
      },
      {
        label: "过去增多，未来减少",
        key: "the-past-increases-the-future-recedes",
      },
    ],
  },
];
</script>
