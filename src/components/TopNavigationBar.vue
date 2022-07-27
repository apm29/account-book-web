<template>
  <div
    v-if="userInfo"
    flex="~"
    items="center"
    p="x-3 t-2"
    border="b gray-400/50"
    gap="x-3"
    h="55px"
  >
    <AppTitle v-if="!md"></AppTitle>
    <n-menu :value="activeKey" mode="horizontal" :options="menuOptions" />
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
import { useAppStore } from "~/store";
import { RouterLink, useRoute } from "vue-router";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
const breakpoints = useBreakpoints(breakpointsTailwind);

const route = useRoute();
const appStore = useAppStore();
const userInfo = computed(() => appStore.userInfo);
function renderIcon(icon) {
  return () => h("i", { class: icon });
}
function renderRoute(name, title) {
  return () =>
    h(
      RouterLink,
      {
        to: {
          name: name,
        },
      },
      { default: () => title }
    );
}

const activeKey = computed(() => route.name);
const functions = [
  {
    label: renderRoute("ExpenseIndex", "账单"),
    key: "ExpenseIndex",
    icon: renderIcon("i-carbon:money"),
  },
  {
    label: renderRoute("BudgetIndex", "预算"),
    key: "BudgetIndex",
    icon: renderIcon("i-carbon:wallet"),
  },
  {
    label: renderRoute("PropertyIndex", "资产"),
    key: "PropertyIndex",
    icon: renderIcon("i-carbon:manage-protection"),
  },
];
const md = breakpoints.smaller("md");
const menuOptions = computed(() => {
  return md.value
    ? [
        {
          label: "",
          key: "more",
          icon: renderIcon("i-carbon:menu"),
          children: [
            ...functions,
            {
              label: renderRoute("FamilyIndex", "我的家庭"),
              key: "FamilyIndex",
              icon: renderIcon("i-carbon:pedestrian-family"),
            },
          ],
        },
      ]
    : [
        ...functions,
        {
          label: "更多",
          key: "more",
          icon: renderIcon("i-carbon:overflow-menu-vertical"),
          children: [
            {
              label: renderRoute("FamilyIndex", "我的家庭"),
              key: "FamilyIndex",
              icon: renderIcon("i-carbon:pedestrian-family"),
            },
          ],
        },
      ];
});
</script>
