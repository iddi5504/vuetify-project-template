<template>
  <v-row align="center" gap="2">
    <!-- Switch Button -->
    <v-col>
      <v-switch
        v-model="isActive"
        :label="lable"
        color="secondary"
        hide-details
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: () => false,
  },
  lable: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const isActive = ref(props.modelValue);

watch(
  () => isActive.value,
  (newValue) => {
    emit("update:modelValue", newValue);
  }
);

// Watch for external changes to modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    isActive.value = newValue;
  }
);
</script>
