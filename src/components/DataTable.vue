<template>
    <transition name="modal-fade-scle" mode="out-in">
        <!-- v-if="!loading && errorMessage" -->
        <EmptyState v-if="errorMessage" class="mt-15 pt-15" image="server.png" title="Oops, An error occured"
            subtitle="Something went wrong, but don't fret! We're working on it. Try again in some moments later">
            <template #action>
                <VButton text="Retry" class="mt-3" prepend-icon="mdi-reload" color="primary" :loading="loading" @click="() => fetchItems()
                    " />
            </template>
        </EmptyState>
        <div class="bg-surface pa-5 border-sm rounded-xl" v-else>
            <div class="d-flex flex-column pb-6">
                <h4 class="text-h6 pb-1">{{ title }}</h4>
                <div class="d-flex align-center flex-row ga-3">
                    <div class="w-100 d-flex ga-3 align-center ">
                        <TextField v-if="!noSearch" v-model="search" label="Search" autocomplete="null"
                            @update:model-value="
                                (debouncedSearch as Function)
                                " prepend-inner-icon="mdi-magnify" />
                        <slot name="actionButton" />
                    </div>
                    <v-spacer></v-spacer>
                    <!-- <template v-if="display.mdAndUp.value" v-for="filter in filters?.slice(0, 3)"> -->
                    <!-- <Input style="max-width: 170px; height: 100%" v-if="
                            filter.type === FormItemType.TEXT ||
                            filter.type === FormItemType.DATE ||
                            filter.type === FormItemType.DATE_RANGE
                        " :label="filter.title" :type="filter.type" clearable hover-label
                            @update:model-value="onInputUpdate($event, filter)"
                            v-model="allTableFilters[filter.key as keyof typeof allTableFilters]" /> -->

                    <!-- <Select v-else v-model="allTableFilters[filter.key as keyof typeof allTableFilters]"
                            :label="filter.title" style="max-width: 170px; height: 100%" :options="filter.options"
                            clearable hover-label hide-details></Select> -->
                    <!-- </template> -->

                    <!-- <v-btn v-if="showFilterButton" @click="showFilterDialogue"
                        :variant="filterApplied ? 'elevated' : 'plain'" color="primary" icon="mdi-filter-variant" /> -->
                    <!-- <v-btn v-if="showApplyButton" @click="fetchItems()" :variant="'outlined'"
                        color="primary">Apply</v-btn>
                        -->
                </div>
            </div>

            <div class="pa-1 shadow-md border-sm rounded-lg pt-5!">
                <v-data-table-server v-if="!localSearch" :headers="headers" :loading="loading ? 'primary' : false"
                    :page="page" :items="items" hover :items-per-page="_itemsPerPage" :items-length="totalItems"
                    @update:items-per-page="page => {
                        _itemsPerPage = page;
                        fetchItems()
                    }" @update:sort-by="(_sort) => {
                        sortBy = _sort[0].key;
                        sortOrder = _sort[0].order;
                        fetchItems();
                    }
                        " @update:page="fetchItems">

                    <template v-slot:item.avatar="{ item }">
                        <slot name="avatar" :item="item"></slot>
                    </template>

                    <template v-slot:item.image="{ item }">
                        <slot name="image" :item="item">
                            <v-img v-if="(item as Record<string, string>).s3ImageObjectKey?.length" class="ma-2"
                                :src="getStorageURL((item as Record<string, string>)?.s3ImageObjectKey ?? '')" sizes="3"
                                rounded="md">
                                <template #placeholder>
                                    <Loader class="ma-1" />
                                </template>
                            </v-img>
                            <v-icon v-else size="40" color="grey" class="pl-7" icon="mdi-image-minus-outline" />
                        </slot>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <div @click.capture="emits('itemSelected', item)">
                            <v-menu v-if="$vuetify.display.mobile" transition="slide-y-transition">
                                <template v-slot:activator="{ props }">
                                    <v-btn icon="mdi-dots-horizontal" size="30" rounded v-bind="props"></v-btn>
                                </template>
                                <v-list>
                                    <v-list-item v-for="(action, index) in tableActions" :key="index"
                                        :prepend-icon="action.icon" :density="'compact'"
                                        :base-color="{ 'edit': 'orange', 'delete': 'red', 'view': 'primary' }[action.name.toLowerCase()]"
                                        :title="action.name" @click="async () => {
                                            action.action(item);
                                        }
                                            ">
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                            <div v-else class="d-flex justify-end ga-4">
                                <div v-for="action in tableActions" :key="action.name">
                                    <v-btn :density="'comfortable'" :variant="'outlined'"
                                        :color="{ 'edit': 'orange', 'delete': 'red', 'view': 'primary' }[action.name.toLowerCase()]"
                                        :prepend-icon="action.icon" @click="async () => {
                                            action.action(item);
                                        }
                                            ">{{ action.name }}</v-btn>
                                </div>

                            </div>
                        </div>
                    </template>

                    <template v-slot:item.country="{ item }">
                        <div class="inline-flex space-x-1">
                            <Flag :code="(item as Record<string, string>).country" />
                            <span>{{ getCountryName((item as Record<string, string>).country ?? '') }}</span>
                        </div>
                    </template>

                    <template v-slot:item.enabled="{ item }">
                        <v-chip
                            :color="getStatusColor((item as Record<string, string>).enabled ? 'enabled' : 'disabled')">
                            {{ toSentenseCase((item as Record<string, string>).enabled ? 'Enabled' : 'Disabled') }}
                        </v-chip>
                    </template>
                </v-data-table-server>
                <v-data-table v-else :headers="headers" :loading="loading" :items-per-page="_itemsPerPage"
                    :items="items" :search="search">
                    <template v-slot:item.action="{ item }">
                        <div @click.capture="emits('itemSelected', item)">
                            <v-menu transition="slide-y-transition">
                                <template v-slot:activator="{ props }">
                                    <v-btn icon="mdi-dots-horizontal" size="30" rounded v-bind="props"></v-btn>
                                </template>
                                <v-list>
                                    <v-list-item v-for="(action, index) in tableActions" :key="index"
                                        :prepend-icon="action.icon"
                                        :base-color="action.name.toLowerCase() === 'delete' ? 'red' : ''"
                                        :density="'compact'" @click="async () => {
                                            action.action(item ?? '');
                                        }
                                            ">
                                        <v-list-item-title>{{ action.name }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </div>
                    </template>
                </v-data-table>
            </div>
        </div>

    </transition>

    <!-- <v-dialog v-model="showingFilterDialogue" width="auto w-100">
        <FilterDialogue :filters="filters ?? []" :filter-values="allTableFilters" @submit="
            allTableFilters = $event;
        fetchItems();
        showingFilterDialogue = false;
        if (Object.keys($event).length) {
            filterApplied = true
        } else {
            filterApplied = false;
        }
        " @close="showingFilterDialogue = false" />
    </v-dialog> -->
</template>

<script setup lang="ts">

import { debounce, getCountryName, getStorageURL, toSentenseCase } from "@/core/helpers";
import { SORT_ORDER, type API_LIST_QueryParams, type API_LIST_RESPONSE } from "@/types/api";
import type { TableOption } from "@/types/gloabal";
import { useDisplay } from "vuetify";
import TextField from "./TextField.vue";
const display = useDisplay();
const props = defineProps({
    headers: {
        type: Array as PropType<Array<any>>,
        required: true,
    },
    apiCall: {
        type: Function as PropType<(params: API_LIST_QueryParams) => Promise<any>>,
        required: true,
    },
    title: {
        type: String,
        required: false
    },
    itemsPerPage: {
        type: Number,
        required: false,
        default: 25
    },
    tableActions: {
        type: Array as PropType<Array<TableOption>>,
        required: true,
    },

    // filters: {
    //     type: Array as PropType<Array<Filter>>,
    //     required: false,
    // },
    noSearch: {
        type: Boolean,
        required: false,
    },

    localSearch: {
        type: Boolean,
        required: false,
    },
});


const emits = defineEmits<{
    (event: "itemSelected", payload: unknown): void;
}>();

const items = ref<unknown[]>([]);
const totalItems = ref(0);
const loading = ref(false);
const search = ref("");
const page = ref(3);
const sortBy = ref("");

const allTableFilters = ref<Record<string, string>>({});
const sortOrder = ref<SORT_ORDER>(SORT_ORDER.ASC);
const errorMessage = ref<string | null>();
const _itemsPerPage = ref<number>(25)
const filterApplied = ref<boolean>(false)


// const showFilterButton = computed(() => {
//     return ((props.filters && props.filters.length > 3) || display.mobile.value) && !props.localSearch;
// });

const showApplyButton = computed(() => {
    return !props.localSearch;
});

const fetchItems = async (_page?: number) => {
    loading.value = true;
    page.value = _page ?? 1;
    try {
        const data: API_LIST_RESPONSE<unknown> = await props.apiCall(
            {
                page: page.value - 1,
                search: search.value ?? "",
                name: search.value,
                sortBy: sortBy.value,
                offset: _itemsPerPage.value.toString(),
                sortOrder: sortOrder.value,
                // ...cleanObject(allTableFilters.value),
            }
        );
        items.value = data.content;
        totalItems.value = data.total;
        errorMessage.value = null;
    } catch (e) {
        errorMessage.value = "Error occured";
    } finally {
        loading.value = false;
    }
};


let debouncedSearch: (() => void) | null = debounce(() => fetchItems(), 600);
const showingFilterDialogue = ref(false);
const showFilterDialogue = () => {
    showingFilterDialogue.value = true;
};

const getStatusColor = (
    status: string
): string => {
    switch (status) {

        case 'enabled':
            return "green";

        case 'disabled':
            return "orange";

        case 'gray':
            return "gray";

        default:
            return "red";
    }
};

onMounted(() => {
    _itemsPerPage.value = props.itemsPerPage;
    fetchItems();
    if (props.localSearch) {
        debouncedSearch = null;
    }
});

defineExpose({
    fetchItems,
});
</script>
