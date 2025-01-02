<script setup lang="ts">
import { countries } from '@/constants';
import { VTextField } from 'vuetify/components/VTextField'
import { VTextarea } from 'vuetify/components/VTextArea'

const props = defineProps<{
  label?: string;
  placeholder?: string;
  modelValue?: any;
  type?: string;
  disabled?: boolean;
  rules?: Array<Function>;
  phoneNumber?: boolean;
  icon?: string;
  floatingLabel?: boolean;
  autofocus?: boolean;
  isTextarea?: boolean; // Added prop to switch between text field and text area
}>();

const emit = defineEmits(['update:modelValue']);

const phoneCode = ref("+964");

const value = computed({
  get() {
    if (props.phoneNumber) {
      return extractPhoneNumber(props.modelValue).restOfNumber;
    }
    return props.modelValue;
  },
  set(value) {
    if (props.phoneNumber) {
      emit('update:modelValue', `${phoneCode.value}-${value}`);
      return;
    }
    emit('update:modelValue', value);
  },
});

watch(() => phoneCode.value, () => {
  emit('update:modelValue', `${phoneCode.value}-${value.value}`);
});

function extractPhoneNumber(phoneNumber: string) {
  if (!phoneNumber) return { countryCode: '', restOfNumber: '' };
  const matchingCountryCode = countries.find((country) =>
    phoneNumber?.startsWith(`${country.phoneCode}`)
  );

  if (matchingCountryCode) {
    const countryCode = matchingCountryCode.phoneCode;
    const restOfNumber = phoneNumber.slice(countryCode.length + 1);

    return { countryCode, restOfNumber };
  }

  return { error: "Country code not found" };
}

const randomId = `input-${Math.random().toString(36).substr(2, 9)}`;

const focusedInput = ref('');

const isPasswordVisible = ref(false);

const inputRef = ref<HTMLInputElement | null>(null);

onMounted(() => {
  if (props.autofocus) inputRef.value?.focus();
});
</script>

<template>
  <component :is="props.isTextarea ? VTextarea : VTextField" v-model="value" color="primary" :rules="rules as []"
    :label="label" :placeholder="placeholder"
    :type="type === 'password' ? (isPasswordVisible ? 'text' : 'password') : type" variant="solo-filled"
    :outlined="!floatingLabel" :filled="floatingLabel" :disabled="disabled"
    :class="phoneNumber ? 'flex-grow' : 'w-full'" @focus="focusedInput = randomId" @blur="focusedInput = ''"
    :prepend-icon="icon" hide-details
    :append-inner-icon="type === 'password' ? (isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye') : undefined"
    @click:append="type === 'password' ? (isPasswordVisible = !isPasswordVisible) : undefined">

    <template v-if="phoneNumber" #prepend class="w-100">
      <CountrySelector class="border-1 border-r-2 border-slate-200 !pl-0  !pr-0" phone-code
        v-model:model-value="phoneCode" />
    </template>

  </component>
</template>


<style>
.v-input__prepend {
  margin-right: 0 !important;
}
</style>