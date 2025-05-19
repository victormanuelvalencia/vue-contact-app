<script setup>
import { ref, onMounted } from 'vue';
import ContactsTable from '../components/ContactTable.vue';
import { useRoute } from 'vue-router';

// const contactForm = ref({
//     id: null,
//     name: '',
//     email: '',
//     user_id: ''
// })

const tablaTabulator = ref(null)

const columns = ref([
    { title: 'ID', field: 'id' },
    { title: 'Nombre', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'User ID', field: 'user_id' }
]);

const tabulatorOptions = ref({
  locale: true,
  pagination: true,
  paginationMode: 'remote',
  ajaxURL: 'http://localhost:8090/contacts',
  paginationSize: 10,
  layout: 'fitColumns',
  footerElement: `<button class="-ml-2 rounded-sm px-4 py-1 bg-gray-200 hover:bg-gray-300 duration-300" id="agregar">
                  Agregar
                  </button>`
});




// miaumiaumiaumiaumiaumiaumiauiaumiaumiaumiaumiaumiaumiaumiaumiaumiaumiaumiaumiaumiaumiaumiau

// const handleSubmit = async () => {
//   const data = { ...contactForm.value }

// }
</script>

<template>
    <ContactsTable :columns="columns" :options="tabulatorOptions" ref="tablaTabulator"/>
</template>