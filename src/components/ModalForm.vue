<template>
  <v-card>
    <v-card-title>
      <slot name="title">{{ title }}</slot>
    </v-card-title>
    <v-card-text>
      <slot name="form"></slot>
    </v-card-text>
    <v-card-actions>
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
// take title props
defineProps({
  title: {
    type: String,
    default: "Form Title",
  },
});
</script>

<style scoped>
/* Add any custom styles here */
</style>
