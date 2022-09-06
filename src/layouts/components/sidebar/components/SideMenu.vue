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
      (currentRoute.meta && currentRoute.meta.activeMenu as any) || currentRoute.name as any
    "
    @update:value="handleMenuSelect"
  />
</template>

<script setup lang="ts">
import { renderIcon, renderCustomIcon } from "@/util/common/index";
import type { Meta, RouteType } from "@/types/router";
import { usePermissionStore } from "@/store/permission/index";
import { useAppStore } from "@/store/app";
import { MenuOption } from "naive-ui";
import { tagStore } from "@/store/tag/tag";
const tag = tagStore();
const router = useRouter();
const appStore = useAppStore();
const permissionStore = usePermissionStore();

const { currentRoute } = router;

/** 菜单对象 */
const menuOptions: any = computed(() => {
  return permissionStore.menus
    .map((item) => getMenuItem(item))
    .sort((a, b) => a.order - b.order);
});

/** 菜单对象类型 */
interface MennuItem {
  label: string;
  key: string;
  path: string;
  icon: (() => import("vue").VNodeChild) | null;
  order: number;
  children?: Array<MennuItem>;
}

/**
 * @author 胖三斤
 * @ClassName:
 * @Description: 根据Router来处理路由对象转换为菜单对象
 * @params
 * @DateTime 2022-09-4 15:50:45
 */
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

/**
 * @author 胖三斤
 * @ClassName:
 * @Description: 图标解析
 * @params
 * @DateTime 2022-09-5 17:50:45
 */
function getIcon(meta?: Meta): (() => import("vue").VNodeChild) | null {
  if (meta?.customIcon) return renderCustomIcon(meta.customIcon, { size: 18 });
  if (meta?.icon) return renderIcon(meta.icon, { size: 18 });
  return null;
}

/**
 * @author 胖三斤
 * @ClassName:
 * @Description: 判断请求
 * @params
 * @DateTime 2022-09-5 18:10:34
 */
function isUrl(path: string): boolean {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
}

/**
 * @author 胖三斤
 * @ClassName:
 * @Description: 路由请求处理
 * @params
 * @DateTime 2022-09-5 18:20:34
 */
function resolvePath(basePath: string, path: string) {
  if (isUrl(path)) return path;
  return `/${[basePath, path]
    .filter((path) => !!path && path !== "/")
    .map((path) => path.replace(/(^\/)|(\/$)/g, ""))
    .join("/")}`;
}

/**
 * @author 胖三斤
 * @ClassName:
 * @Description: 点击菜单触发用于跳转页面
 * @params
 * @DateTime 2022-09-5 18:40:34
 */
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

/** 标签对象类型 */
interface TabItem {
  name: string;
  path: string;
  title?: string;
  icon?: string;
}

/**
 * @author 胖三斤
 * @ClassName:
 * @Description: 监听路由变化然后给标签集合set值
 * @params
 * @DateTime 2022-09-5 19:05:23
 */
watch(
  () => router.currentRoute.value,
  (newPath) => {
    const tabData: TabItem = {
      name: "",
      path: "",
    };
    tabData.name = newPath.name as string;
    tabData.path = newPath.path as string;
    tabData.title = newPath.meta.title as string;
    tabData.icon = newPath.meta.icon as string;
    tag.setTabs(tabData);
    document.title = newPath.meta.title + " - HPlan";
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
