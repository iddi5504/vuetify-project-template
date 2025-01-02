<template>
    <v-snackbar v-model="appStore.toast.show" :timeout="5000" :color="toastColors[appStore.toast.varient || 'info']">
        {{ appStore.toast.message }}
        <template v-slot:actions>
            <v-btn color="white" variant="text" @click="appStore.toast.show = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/stores/appStore';

const appStore = useAppStore();

const toastColors: Record<string, string> = {
    success: 'green',
    warning: 'yellow',
    danger: 'red',
    info: 'blue',
};
</script>
