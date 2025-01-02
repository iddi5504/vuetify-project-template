<template>
  <div class="w-100" v-if="type === FormItemType.DATE_RANGE">
    <small v-if="hoverLabel">{{ label }}</small>
    <VueDatePicker style="width: 300px" class="w-100" teleport :max-date="max" :enable-time-picker="false"
      :min-date="min" :clearable="false" v-model="date" range
      @update:model-value="$emit('update:modelValue', $event)" />
  </div>
  <v-menu v-else v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y
    min-width="auto">
    <template v-slot:activator="{ props }">
      <v-text-field v-bind="readOnly ? null : props" prepend-inner-icon="mdi-calendar" style="cursor: pointer"
        variant="solo-filled" hide-details readOnly :disabled="readOnly" dirty :value="formattedDate"></v-text-field>
    </template>
    <v-date-picker v-if="type === FormItemType.DATE" v-model="date" :disabled="readOnly" @input="menu = false"
      color="primary" :value="value" :rules="[rules.required]" :min="min" range scrollable :max="max"
      @update:model-value="
        $emit('update:modelValue', dateApiFormat($event as unknown as string))
        "></v-date-picker>
  </v-menu>
</template>

<script lang="ts" setup>

import { dateApiFormat, formatDateToFromAPI } from "@/core/helpers";
import rules from "@/rules";
import { FormItemType } from "@/types/gloabal";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  min: {
    type: String,
    default: "",
  },
  dateRangeStartKey: {
    type: String,
    default: "",
  },
  dateRangeEndKey: {
    type: String,
    default: "",
  },
  max: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
    required: true
  },
  readOnly: {
    type: Boolean,
    required: false,
    default: false,
  },
  hoverLabel: {
    type: Boolean,
    required: false,
    default: false,
  },
  type: {
    type: String as PropType<FormItemType>,
    required: false,
  },
});
const emit = defineEmits(["update:modelValue"]);

const date = ref(null);
const menu = ref(false)


const formattedDate = computed(() => {
  if (date.value) {
    const _date = new Date(date.value).toLocaleDateString();
    menu.value = false;
    return _date;
  } else {
    if (!props.value) return;
    return formatDateToFromAPI(props.value);
  }
});
</script>
