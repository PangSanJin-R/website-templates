import { defineStore } from "pinia";
import { useRouter } from "vue-router";

/** 路由标对象 */
export interface TabItem {
  name: string;
  path: string;
  title?: string;
  icon?: string;
}

export const tagStore = defineStore("tagStore", {
  state: () => {
    return {
      tabs: <Array<TabItem>>[],
      router: useRouter(),
    };
  },
  actions: {
    /**
     * @author 胖三斤
     * @ClassName:
     * @Description: 根据传入的标签对象添加路由标签
     * @params
     * @DateTime 2022-09-5 16:41:23
     */
    setTabs(tab: TabItem) {
      /** 用来判断tab中是否包含新传入的路由 */
      let count: number = 0;
      this.tabs.forEach((item: TabItem) => {
        if (item.name == tab.name) {
          count = 1;
        }
      });
      if (count == 0 && tab.path != "/") {
        this.tabs.push(tab);
      }
    },
    /**
     * @author 胖三斤
     * @ClassName:
     * @Description: 根据传入的路由名称删除对应的标签并根据规则跳转路由
     * @params
     * @DateTime 2022-09-5 16:45:23
     */
    removeTab(name: string) {
      this.tabs.forEach((item: TabItem, index) => {
        if (item.name == name) {
          this.tabs.splice(index, 1);
          console.log("index", index);
          if (index > 0) {
            const tab = this.tabs[index - 1] as TabItem;
            this.router.push(tab.path);
          } else {
            const tab = this.tabs[index] as TabItem;
            this.router.push(tab.path);
          }
        }
      });
    },
    /**
     * @author 胖三斤
     * @ClassName:
     * @Description: 根据传入的路由地址跳转路由
     * @params
     * @DateTime 2022-09-5 16:50:45
     */
    routerJump(path: string) {
      this.router.push(path);
    },
  },
});
