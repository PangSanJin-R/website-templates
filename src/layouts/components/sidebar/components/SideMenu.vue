<template>
  <n-menu
    vue-router
    class="side-menu"
    accordion
    :indent="18"
    :collapsed-icon-size="22"
    :collapsed-width="64"
    :options="menuOptions"
    :value="
      (currentRoute.meta && currentRoute.meta.activeMenu) || currentRoute.name
    "
    @update:value="handleMenuSelect"
  />
</template>

<script setup lang="ts">
import { renderIcon, renderCustomIcon } from "@/util/common/index";
import type { Meta, RouteType } from "@/types/router";
import { usePermissionStore } from "@/store/permission/index";
import { useRouter } from "vue-router";
import { useAppStore } from "@/store/app";
import { MenuOption } from "naive-ui";
import { watch } from "vue";
import { tagStore } from "@/store/tag/tag";
const tag = tagStore()
const router = useRouter();
const appStore = useAppStore();
const permissionStore = usePermissionStore();

const { currentRoute } = router;

const menuOptions: any = computed(() => {
  return permissionStore.menus
    .map((item) => getMenuItem(item))
    .sort((a, b) => a.order - b.order);
});

interface MennuItem {
  label: string;
  key: string;
  path: string;
  icon: (() => import("vue").VNodeChild) | null;
  order: number;
  children?: Array<MennuItem>;
}

function getMenuItem(route: RouteType, basePath = ""): MennuItem {
  let menuItem: MennuItem = {
    label: (route.meta && route.meta.title) || route.name,
    key: route.name,
    path: resolvePath(basePath, route.path),
    icon: getIcon(route.meta),
    order: route.meta?.order || 0,
  };

  const visibleChildren = route.children
    ? route.children.filter((item: RouteType) => item.name && !item.isHidden)
    : [];

  if (!visibleChildren.length) return menuItem;

  if (visibleChildren.length === 1) {
    // 单个子路由处理
    const singleRoute = visibleChildren[0];
    menuItem = {
      label: singleRoute.meta?.title || singleRoute.name,
      key: singleRoute.name,
      path: resolvePath(menuItem.path, singleRoute.path),
      icon: getIcon(singleRoute.meta),
      order: menuItem.order,
    };
    const visibleItems = singleRoute.children
      ? singleRoute.children.filter(
          (item: RouteType) => item.name && !item.isHidden
        )
      : [];

    if (visibleItems.length === 1)
      menuItem = getMenuItem(visibleItems[0], menuItem.path);
    else if (visibleItems.length > 1)
      menuItem.children = visibleItems
        .map((item) => getMenuItem(item, menuItem.path))
        .sort((a, b) => a.order - b.order);
  } else {
    menuItem.children = visibleChildren
      .map((item) => getMenuItem(item, menuItem.path))
      .sort((a, b) => a.order - b.order);
  }

  return menuItem;
}

function getIcon(meta?: Meta): (() => import("vue").VNodeChild) | null {
  if (meta?.customIcon) return renderCustomIcon(meta.customIcon, { size: 18 });
  if (meta?.icon) return renderIcon(meta.icon, { size: 18 });
  return null;
}

function isUrl(path: string): boolean {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
}

function resolvePath(basePath: string, path: string) {
  if (isUrl(path)) return path;
  return `/${[basePath, path]
    .filter((path) => !!path && path !== "/")
    .map((path) => path.replace(/(^\/)|(\/$)/g, ""))
    .join("/")}`;
}

function handleMenuSelect(key: string, item: MenuOption) {
  const menuItem = item as MennuItem & MenuOption;
  if (isUrl(menuItem.path)) {
    window.open(menuItem.path);
  } else {
    if (
      menuItem.path === currentRoute.value.path &&
      !currentRoute.value.meta?.keepAlive
    )
      appStore.reloadPage();
    else router.push(menuItem.path);
  }
}

interface TabItem {
  name: string;
  path: string;
  title?: string;
  icon?: string
}

/**
 * @author 胖三斤
 * @ClassName:
 * @Description: 监听路由变化
 * @params
 * @DateTime 2022-09-5 11:10:23
 */
watch(
  () => router.currentRoute.value,
  (newPath) => {
    const tabData: TabItem = {
      name: "",
      path: ""
    };
    tabData.name = newPath.name as string
    tabData.path = newPath.path as string
    tabData.title = newPath.meta.title as string
    tabData.icon = newPath.meta.icon as string
    tag.setTabs(tabData)
  },
  { immediate: true }
);
</script>

<style lang="scss">
.side-menu:not(.n-menu--collapsed) {
  .n-menu-item-content {
    &::before {
      left: 5px;
      right: 5px;
    }
    &.n-menu-item-content--selected,
    &:hover {
      &::before {
        background-color: rgba(49, 108, 114, 0.1);
        border-left: 4px solid #316c72ff;
      }
    }
  }
}
</style>
