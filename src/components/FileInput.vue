<template>
  <v-container class="pa-0">
    <!-- File Input Component -->
    <v-card outlined class="pa-0">
      <v-card-title>{{ label }}</v-card-title>
      <v-card-text>
        <v-file-input label="Choose an image" accept="image/*" variant="solo-filled" show-size outlined dense
          @change="handleFileChange"></v-file-input>

        <!-- Preview Section -->
        <v-img v-if="previewSrc" :src="previewSrc" alt="Image preview" max-height="240" max-width="100%" class="mt-4"
          contain>
          <template #placeholder>
            <loader />
          </template>

        </v-img>
        <p v-else class="mt-4 text-secondary">No image selected for preview.</p>
      </v-card-text>

      <!-- Clear and Upload Actions -->
      <v-card-actions v-if="internalFile">
        <v-btn color="error" @click="clearFile">Clear</v-btn>
        <v-btn color="primary" :disabled="!internalFile" v-if="upload" @click="upload">Upload</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const internalFile = ref<File | null>(null);
const previewSrc = ref<string | null>(null);

// Props definition
const props = defineProps({
  label: {
    type: String,
    default: 'Upload Image',
  },
  upload: {
    type: Function,
    default: null,
  },
  modelValue: {
    type: File,
    default: null,
  },
  fileUrl: {
    type: String,
    default: null,
  }
});

onMounted(() => {
  previewSrc.value = props.fileUrl
})

// Emit event for v-model
const emit = defineEmits(['update:modelValue']);

// Watch modelValue to synchronize with internalFile
watch(
  () => props.modelValue,
  (newValue) => {
    internalFile.value = newValue;
    if (newValue) previewFile(newValue);
    else clearPreview();
  },
  { immediate: true }
);

// Handle file changes
function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files ? input.files[0] : null;
  internalFile.value = file;
  emit('update:modelValue', file);
  previewFile(file);
}

// Preview the selected file using ObjectURL
function previewFile(file: File | null) {
  if (!file) return;
  clearPreview(); // Clear any existing ObjectURL to prevent memory leaks
  previewSrc.value = URL.createObjectURL(file);
}

// Clear the selected file and revoke the ObjectURL
function clearFile() {
  internalFile.value = null;
  emit('update:modelValue', null);
  clearPreview();
}

// Clear the preview and revoke any created ObjectURL
function clearPreview() {
  if (previewSrc.value) {
    URL.revokeObjectURL(previewSrc.value); // Revoke the URL to free up memory
    previewSrc.value = null;
  }
}
</script>

<style scoped>
.text-secondary {
  color: rgba(0, 0, 0, 0.6);
}
</style>
