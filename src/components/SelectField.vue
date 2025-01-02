<template>
  <v-autocomplete v-model="selectedItems" :variant="'solo-filled'" :disabled="disabled" :placeholder="placeholder"
    hide-details class="custom-autocomplete" :loading="loading" :items="items" :multiple="multiple"
    :item-title="labelKey ?? 'name'" :item-value="valueKey ?? 'id'" clearable @update:modelValue="updateModelValue">

  </v-autocomplete>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

// Props
const props = defineProps<{
  modelValue: any[] | null | string;
  label: string;
  items: any[];
  multiple?: boolean;
  disabled?: boolean;
  loading?: boolean;
  labelKey?: string;
  errorMessages?: unknown[]
  placeholder?: string;
  valueKey?: string;

}>();

const emit = defineEmits(["update:modelValue"]);

// State
const selectedItems = ref(props.modelValue || []);


// Watch: Sync `selectedItems` with `modelValue`
watch(
  () => props.modelValue,
  (newValue) => {
    selectedItems.value = newValue || [];
  },
  { immediate: true }
);

// Emit updated value
const updateModelValue = () => {
  emit("update:modelValue", selectedItems.value);
};
</script>


<style scoped></style>