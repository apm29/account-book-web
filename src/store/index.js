import { defineStore } from "pinia";
import { localToken } from "~/composables";

export const useAppStore = defineStore("app-state", {
  state: () => {
    return {
      token: localToken,
      userInfo: ref(),
    };
  },
  actions: {
    logoutUser() {
      this.userInfo = null
      this.token = null
    },

    loginUser() {
      this.userInfo = {
        photo: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      }
    },
  },
});
