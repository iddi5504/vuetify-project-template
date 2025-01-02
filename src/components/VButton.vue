<script setup lang="ts">
import { useAppStore } from "@/stores/appStore";
import { storeToRefs } from "pinia";

const { appColors } = storeToRefs(useAppStore());

defineProps<{
  text?: string;
  icon?: string;
  appendIcon?: string;
  bgColor?: "primary" | "secondary" | "danger" | string;
  style?: "pill" | "rounded";
  size?: "base" | "small";
  isLoading?: boolean;
  disabled?: boolean;
  variant?: "outlined";
}>();

const buttonStyles = {
  sizes: {
    small: {
      density: "compact",
      size: "small",
    },
    base: {
      density: "default",
      size: "medium",
    },
  },
};
</script>

<template>
  <VBtn :variant="variant || 'elevated'" :base-color="bgColor || 'primary'" :color="bgColor || 'primary'"
    :size="buttonStyles.sizes[size || 'base'].size" class="text-nowrap pa-2 no-uppercase" :loading="isLoading"
    :append-icon="appendIcon" :disabled="isLoading || disabled">
    <template v-if="icon && !isLoading" #prepend>
      <VIcon>{{ icon }}</VIcon>
    </template>
    <template v-if="text">{{ text }}</template>
    <template v-else-if="isLoading">
      <VProgressCircular indeterminate size="20" color="white" />
    </template>
  </VBtn>
</template>
