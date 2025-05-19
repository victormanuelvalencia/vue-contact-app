<script setup>
import { ref, onMounted, watch } from 'vue'
import { TabulatorFull as Tabulator } from 'tabulator-tables'
import 'tabulator-tables/dist/css/tabulator_site_dark.min.css'

const tabulatorRef = ref(null)
const tabulator = ref(null)

const props = defineProps({
    columns: {
        type: Array,
        required: true
    },
    data: {
        type: Array,
        required: true
    },
    options: {
        type: Object,
        default: () => ({})
    }
})

onMounted(() => {
  tabulator.value = new Tabulator(tabulatorRef.value, {
    columns: props.columns,
    ...props.options
  });

  tabulator.value.on('tableBuilt', () => console.log('Tabla de contactos cargada'));
});


watch(
    () => props.data,
    newData => {
        if (tabulator.value) {
            tabulator.value.setData(newData)
        }
    },
    { deep: true }
)

watch(
    () => props.columns,
    newColumns => {
        if (tabulator.value) {
            tabulator.value.setColumns(newColumns)
        }
    },
    { deep: true }
)

defineExpose({
    getTable: () => tabulator.value
})
</script>

<template>
    <div ref="tabulatorRef"></div>
</template>

<style scoped>
.tabulator-headers {
   background-color: #f0f0f0;
}
</style>
