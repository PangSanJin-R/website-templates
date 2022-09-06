<template>
  <div class="tagCenter">
    <n-tag
      class="pointer"
      :color="{ color: 'rgba(49, 108, 114, 0.1)', textColor: '#555', borderColor: '#e8c8f1' }"
      px-2
      mx-2
      v-for="item in tag.tabs"
      :closable="tag.tabs.length > 1"
      @close.stop="handleClose(item.name)"
      @click="handleTagClick(item.path)"
    >
      <component class="va-20" :is="getIcon(item.icon)" />
      {{ item.title }}
    </n-tag>
  </div>
</template>
<script setup lang="ts">
import { tagStore } from "@/store/tag/tag";
import { renderIcon } from "@/util/common/index";

const tag = tagStore();

/**
 * @author 胖三斤
 * @ClassName:
 * @Description: 点击标签关闭按钮触发
 * @params
 * @DateTime 2022-09-5 16:40:23
 */
function handleClose(name: string) {
  tag.removeTab(name);
}

/**
 * @author 胖三斤
 * @ClassName:
 * @Description: 点击标签跳转路由
 * @params
 * @DateTime 2022-09-6 10:40:23
 */
function handleTagClick(path: string) {
  tag.routerJump(path);
}

/**
 * @author 胖三斤
 * @ClassName:
 * @Description: 图标转换
 * @params
 * @DateTime 2022-09-5 13:40:23
 */
function getIcon(icon?: string, size = 16) {
  return renderIcon(icon || "", { size });
}
</script>
<style lang="scss" scoped>
.tagCenter {
  display: flex;
  padding: 7px 10px;
  align-items: center;
}

.pointer {
  cursor: pointer;
}

.va-20 {
  vertical-align: -20%;
}
</style>
