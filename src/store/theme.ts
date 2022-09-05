import { defineStore } from 'pinia'
import { themeSettings } from '@/setting/index'
export const useThemeStore = defineStore('theme', {
  state() {
    return {
      tag: themeSettings.tags || { visible: true, height: 50 },
      header: themeSettings.header || { height: 60 },
      naiveThemeOverrides: themeSettings.naiveThemeOverrides || {
        common: {
          primaryColor: '#316C72FF',
          primaryColorHover: '#316C72E3',
          primaryColorPressed: '#2B4C59FF',
          primaryColorSuppl: '#316C7263',
        },
      },
    }
  },
  actions: {
    setTabVisible(visible : boolean) {
      this.tag.visible = visible
    },
  },
})
