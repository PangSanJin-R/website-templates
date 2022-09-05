import { defineStore } from "pinia";
import { useRouter } from 'vue-router'

export interface TabItem {
  name: string;
  path: string;
  title?: string;
  icon?: string
}

export const tagStore = defineStore("tagStore", {
  state: () => {
    return {
      tabs: <Array<TabItem>>[],
      router: useRouter()
    };
  },
  actions: {
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
    removeTab(name: string) {
        this.tabs.forEach((item: TabItem,index) => {
            if (item.name == name) {
                this.tabs.splice(index,1)
                let num = index - 1;
                const tab = this.tabs[num] as TabItem
                this.router.push(tab.path)
            }
        })
    },
    tabJump(path: string) {
        this.router.push(path)
    }
  },
});
