<template>
  <v-col>
    <div class="text-center">
      <v-img height="150" src="../assets/empty-folder.png"> </v-img>
      <h3 class="text-h5">{{ title }}</h3>
      <p class="text-body">{{ description }}</p>

      <slot name="action" />
    </div>
  </v-col>
</template>

<script setup lang="ts">
// props
defineProps({
  title: String,
  description: String,
});
</script>
