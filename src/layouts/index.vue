<template>
  <n-layout has-sider class="wh-full">
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="220"
      :native-scrollbar="false"
      :collapsed="appStore.collapsed"
    >
      <SideBar />
    </n-layout-sider>
    <article flex-1 class="flex-column" overflow-auto>
      <header
        bg-white
        px-5
        border-b
        flex
        items-center
        dark="bg-dark border-0"
        :style="`height: 65px`"
        class="bc-eee"
      >
        <AppHeader />
      </header>
      <section
        border-b
        dark:border-0
        hidden
        sm:block
        class="bc-eee"
        :style="`height: 45px`"
      >
        <AppTab />
      </section>
      <section
        class="cus-scroll-y flex-1 p-5 overflow-auto"
        bg="#f5f6fb"
        dark="bg-[#101014]"
      >
        <AppMain />
      </section>
    </article>
  </n-layout>
</template>
<script setup lang="ts">
import { useAppStore } from "@/store/app";
import SideBar from "@/layouts/components/sidebar/index.vue";
import AppHeader from "@/layouts/components/header/index.vue";
import AppTab from "@/layouts/components/tag/index.vue";
import AppMain from "@/layouts/AppMain.vue";

const appStore = useAppStore();

</script>
<style lang="scss">
.flex-column {
  display: flex;
  flex-direction: column;
}

.na-main {
  min-height: 83vh;
  max-height: 83vh;
}
</style>
