<template>
  <router-link class="f-c-c" decoration-none h-16 to="/">
    <n-icon size="40" color="#316c72">
      <svg
        t="1661597097527"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1654"
        width="200"
        height="200"
      >
        <path
          d="M1016.3 674.3c5.5 4.7-8.6 6.2-33.5 0-38.9-10.1-75.5 19.5-75.5 59.2 0 81.8-25.7 168.2-97.3 193.9-102 36.6-203.3-26.5-207.2-156.5-3.9-137.1 42.1-274.1 56.9-343.4 25.7-123 27.3-206.4-28.8-207.2C552.2 218 486 520.1 460.3 676.7c-5.5 35-70.9 42.8-63.1-3.9 7.8-48.3 74.8-458.7 6.2-495.3-61.5-33.5-113.7 102-133.2 200.1-24.9 123-26.5 198.6-41.3 293.6-6.2 39.7-67 40.5-64.6-6.2 5.5-108.3 27.3-295.9-3.9-385.5-31.2-88.8-116.8-51.4-107.5 77.9 1.6 23.4-35.8 3.9-43.6-42.8-12.4-76.4 16.4-163.6 91.9-178.4 35.8-7 63.1 6.2 83.3 28 25.7 28 71.6 25.7 93.5-5.5 28-41.3 67-73.2 109.8-72.4 40.5 1.6 66.2 27.3 82.6 59.2 18.7 35 63.9 43.6 93.5 17.9 31.9-27.3 74.8-42.1 127.7-13.2 56.9 31.2 74 134 60 211.8-22.6 123-47.5 225.8-61.5 340.3-10.1 76.3 0 127.7 37.4 143.3 32.7 14 57.6 5.5 74.8-14.8 38.9-44.4-3.1-108.3-60.7-97.3-3.1 0.8-3.9 0-3.1-2.3 11.7-24.1 40.5-74 71.6-134 17.9-34.3 62.3-43.6 92.7-18.7 49.6 41.3 105.7 89.6 113.5 95.8z"
          fill=""
          p-id="1655"
        ></path>
      </svg>
    </n-icon>
    <h2
      v-show="!appStore.collapsed"
      ml-2
      text-4
      font-bold
      max-w-140
      flex-shrink-0
      color="#316c72"
    >
      胖三斤
    </h2>
  </router-link>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/app";

const appStore = useAppStore();
</script>

<style lang="scss">
.f-c-c {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
