<template>
  <n-breadcrumb separator="~">
    <n-breadcrumb-item v-for="item in breadcrumbData" :key="item.path" @click="chickBreadcrumb(item.path)">
      <component :is="getIcon(item.meta)" />
      {{ item.meta.title }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
<script setup lang="ts">
import { RouteLocationMatched } from "vue-router";
import { Ref } from "vue";
import { renderIcon, renderCustomIcon } from "@/util/common/index";
import type { Meta } from "@/types/router";
const router = useRouter();
const route = useRoute();

/** 面包屑对象 */
const breadcrumbData: Ref<RouteLocationMatched[]> = ref([]);

/**
 * @author 胖三斤
 * @ClassName:
 * @Description: 监听路由变化更新面包屑导航
 * @params
 * @DateTime 2022-09-4 17:10:23
 */
watch(
  () => router.currentRoute.value,
  () => {
    breadcrumbData.value = route.matched.filter(item => !!item.meta?.title) as RouteLocationMatched[]
  },
  { immediate: true }
);

/**
 * @author 胖三斤
 * @ClassName:
 * @Description: 点击面包屑跳转路由
 * @params
 * @DateTime 2022-09-4 17:10:23
 */
function chickBreadcrumb(path: string) {
  router.push(path)
}

/**
 * @author 胖三斤
 * @ClassName:
 * @Description: 图标转换
 * @params
 * @DateTime 2022-09-5 13:40:23
 */
function getIcon(meta?: Meta, size = 16) {
  if (meta?.customIcon)
    return renderCustomIcon(meta.customIcon, { size })
  if (meta?.icon)
    return renderIcon(meta.icon, { size })
  return null
}
</script>
<style lang="scss" scoped></style>
