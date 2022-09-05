<script setup lang="ts">
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade-slide" mode="out-in" appear>
      <component :is="Component" v-if="true" :key="route.path" />
    </transition>
  </router-view>
</template>
