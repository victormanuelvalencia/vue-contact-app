<script setup>
import { ref, onMounted } from 'vue'

const contacts = ref([])
const loading = ref(true)
const error = ref(null)

const userId = localStorage.getItem('userId')

// Datos nuevo contacto
const name = ref('')
const phone = ref('')
const creating = ref(false)
const createError = ref('')

const fetchContacts = async () => {
  if (!userId) {
    error.value = 'No se encontró el ID del usuario.'
    loading.value = false
    return
  }
  
  try {
    console.log('UserId obtenido en ContactsView:', userId);
    const res = await fetch(`http://localhost:3000/api/contacts?userId=${userId}`)
    console.log('UserID:', userId)
    console.log('Response status:', res.status)
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
  } catch (err) {
    createError.value = err.message
  } finally {
    creating.value = false
  }
}

onMounted(fetchContacts)
</script>

<template>
  <div class="contacts-wrapper">
    <h1>Tus Contactos</h1>

    <div class="form">
      <h2>Agregar contacto</h2>
      <input v-model="name" placeholder="Nombre" class="input" />
      <input v-model="phone" placeholder="Teléfono" class="input" />
      <button @click="createContact" :disabled="creating">Crear</button>
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
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
}
.form {
  margin-bottom: 40px;
}
.input {
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 10px auto;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
button {
  padding: 10px 20px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
button:disabled {
  background-color: #aaa;
}
.error-msg {
  color: red;
  margin-top: 10px;
}
</style>
