<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const contacts = ref([])
const loading = ref(true)
const error = ref(null)

const isAuth = localStorage.getItem('isAuth') === 'true'
const userId = localStorage.getItem('userId')

const showForm = ref(false)
const name = ref('')
const phone = ref('')
const creating = ref(false)
const createError = ref('')

// Validar acceso
if (!isAuth || !userId) {
  error.value = 'Debes iniciar sesión para ver tus contactos.'
  loading.value = false
  contacts.value = []
  // Redirigir después de 1.5 seg para mejor UX (opcional)
  setTimeout(() => router.replace({ name: 'account-options' }), 1500)
}

const fetchContacts = async () => {
  if (!isAuth || !userId) return // Seguridad extra

  try {
    const res = await fetch(`http://localhost:3000/api/contacts?userId=${userId}`)
    if (!res.ok) throw new Error('Error al obtener contactos')
    contacts.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const createContact = async () => {
  if (!name.value) {
    createError.value = 'El nombre es obligatorio'
    return
  }

  creating.value = true
  createError.value = ''

  try {
    const res = await fetch('http://localhost:3000/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        name: name.value,
        phone: phone.value
      })
    })

    if (!res.ok) throw new Error('Error al crear el contacto')
    const newContact = await res.json()
    contacts.value.push(newContact)

    // Limpiar formulario
    name.value = ''
    phone.value = ''
    showForm.value = false
  } catch (err) {
    createError.value = err.message
  } finally {
    creating.value = false
  }
}

onMounted(fetchContacts)

// Opcional: escuchar logout en otra pestaña y limpiar
window.addEventListener('storage', (event) => {
  if (event.key === 'isAuth' && event.newValue !== 'true') {
    contacts.value = []
    router.replace({ name: 'account-options' })
  }
})
</script>

<template>
  <div class="contacts-wrapper">
    <h1>Tus Contactos</h1>

    <button @click="showForm = !showForm" class="btn-toggle-form">
      {{ showForm ? 'Cancelar' : 'Nuevo contacto' }}
    </button>

    <div v-if="showForm" class="form">
      <h2>Agregar contacto</h2>
      <input v-model="name" placeholder="Nombre" class="input" />
      <input v-model="phone" placeholder="Teléfono" class="input" />
      <button @click="createContact" :disabled="creating">Guardar</button>
      <p v-if="createError" class="error-msg">{{ createError }}</p>
    </div>

    <div v-if="loading" class="status">Cargando contactos...</div>
    <div v-else-if="error" class="status error">{{ error }}</div>
    <div v-else-if="contacts.length === 0" class="status">No tienes contactos registrados.</div>

    <ul v-else class="contact-list">
      <li v-for="contact in contacts" :key="contact.id" class="contact-card">
        <h3>{{ contact.name }}</h3>
        <p><strong>Teléfono:</strong> {{ contact.phone || 'No proporcionado' }}</p>
      </li>
    </ul>
  </div>
</template>


<style scoped>
.contacts-wrapper {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.status {
  margin-top: 20px;
  font-style: italic;
  color: #666;
}

.status.error {
  color: red;
}

.contact-list {
  list-style: none;
  padding: 0;
}

.contact-card {
  background: #f9f9f9;
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
}

.input {
  display: block;
  width: 100%;
  padding: 8px;
  margin: 8px 0;
}

.btn-toggle-form {
  margin: 12px 0;
  padding: 8px 16px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn-toggle-form:hover {
  background-color: #1a252f;
}
</style>
