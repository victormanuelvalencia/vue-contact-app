<script setup>  
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ContactForm from '../components/ContactForm.vue'
import ContactCard from '../components/ContactCard.vue'

const router = useRouter()
const contacts = ref([])
const loading = ref(true)
const error = ref(null)

const isAuth = localStorage.getItem('isAuth') === 'true'
const userId = localStorage.getItem('userId')

const showForm = ref(false)
const editingContact = ref(null)

if (!isAuth || !userId) {
  error.value = 'Debes iniciar sesión para ver tus contactos.'
  loading.value = false
  contacts.value = []
  setTimeout(() => router.replace({ name: 'account-options' }), 1500)
}

const fetchContacts = async () => {
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

const handleCreateOrUpdate = (contact, isEditing) => {
  if (isEditing) {
    const index = contacts.value.findIndex(c => c.id === contact.id)
    if (index !== -1) contacts.value[index] = contact
  } else {
    contacts.value.push(contact)
  }
  showForm.value = false
  editingContact.value = null
}

const editContact = (contact) => {
  editingContact.value = contact
  showForm.value = true
}

const deleteContact = async (id) => {
  if (!confirm('¿Estás seguro de eliminar este contacto?')) return
  try {
    const res = await fetch(`http://localhost:3000/api/contacts/${id}`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('Error al eliminar contacto')
    contacts.value = contacts.value.filter(c => c.id !== id)
  } catch (err) {
    error.value = err.message
  }
}

onMounted(fetchContacts)
</script>

<template>
  <div class="contacts-container">
    <div class="header-row">
      <h1 class="title">Tus Contactos</h1>
      <button class="new-contact-btn" @click="showForm = true" aria-label="Nuevo contacto">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" height="24" viewBox="0 0 24 24" fill="none" 
          stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
          >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>

    <div v-if="loading" class="status">Cargando contactos...</div>
    <div v-else-if="error" class="status error">{{ error }}</div>
    <div v-else-if="contacts.length === 0" class="status">No tienes contactos registrados.</div>

    <div class="cards">
      <ContactCard
        v-for="contact in contacts"
        :key="contact.id"
        :contact="contact"
        @edit="editContact"
        @delete="deleteContact"
      />
    </div>

    <ContactForm
      v-if="showForm"
      :contact="editingContact"
      :user-id="userId"
      @save="handleCreateOrUpdate"
      @cancel="() => { showForm = false; editingContact = null }"
    />
  </div>
</template>

<style scoped>
.contacts-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 20px;
  position: relative;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.title {
  font-size: 2.2rem;
  color: #2c3e50;
  position: relative;
  left: +20px; /* Mueve el botón 12px a la izquierda */
}

.new-contact-btn {
  background-color: #2ecc71;
  color: white;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  left: -70px; /* Mueve el botón 12px a la izquierda */

}

.new-contact-btn svg {
  stroke: white;
}

.new-contact-btn:hover {
  background-color: #27ae60;

}

.status {
  font-style: italic;
  margin-top: 20px;
  color: #666;
}

.status.error {
  color: red;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: start;
}
</style>