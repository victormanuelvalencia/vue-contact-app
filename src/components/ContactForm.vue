<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  contact: Object,
  userId: [String, Number]
})

const emit = defineEmits(['save', 'cancel'])

const name = ref('')
const phone = ref('')
const creating = ref(false)
const error = ref('')

watch(() => props.contact, (contact) => {
  name.value = contact?.name || ''
  phone.value = contact?.phone || ''
}, { immediate: true })

const submit = async () => {
  if (!name.value.trim()) {
    error.value = 'El nombre es obligatorio'
    return
  } else if (!phone.value.trim()) {
    error.value = 'El teléfono es obligatorio'
    return

  } 

  creating.value = true
  error.value = ''

  try {
    let response

    if (props.contact?.id) {
      response = await fetch(`http://localhost:3000/api/contacts/${props.contact.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.value, phone: phone.value })
      })
    } else {
      response = await fetch('http://localhost:3000/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: props.userId, name: name.value, phone: phone.value })
      })
    }

    if (!response.ok) throw new Error('Error al guardar el contacto')
    const data = await response.json()

    emit('save', data, !!props.contact?.id)
  } catch (err) {
    error.value = err.message || 'Error inesperado'
  } finally {
    creating.value = false
  }
}
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2>{{ props.contact ? 'Editar Contacto' : 'Nuevo Contacto' }}</h2>

      <input v-model="name" placeholder="Nombre" class="input" />
      <input v-model="phone" placeholder="Teléfono" class="input" />

      <div class="buttons-row">
        <button
          @click="submit"
          :disabled="creating"
          class="btn btn-primary"
          aria-label="Guardar contacto"
        >
          {{ props.contact ? 'Actualizar' : 'Guardar' }}
        </button>
        <button
          @click="emit('cancel')"
          class="btn btn-secondary"
          aria-label="Cancelar edición"
        >
          Cancelar
        </button>
      </div>

      <p v-if="error" class="error-msg">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 30px 28px;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  margin-bottom: 24px;
  font-weight: 700;
  color: #34495e;
  font-size: 1.8rem;
}

.input {
  width: 100%;
  padding: 12px 16px;
  margin: 10px 0;
  border-radius: 12px;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.input:focus {
  border-color: #3498db;
  outline: none;
}

.buttons-row {
  display: flex;
  gap: 18px;
  justify-content: center;
  margin-top: 28px;
}

.btn {
  flex: 1;
  padding: 12px 0;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.25s ease, transform 0.15s ease;
  color: white;
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
  box-shadow: none;
}

.btn-primary {
  background-color: #3498db;
}

.btn-primary:hover:not(:disabled),
.btn-primary:focus-visible:not(:disabled) {
  background-color: #2980b9;
  transform: scale(1.05);
  outline: none;
}

.btn-secondary {
  background-color: transparent;
  color: #e74c3c;
  border: 2px solid #e74c3c;
  box-shadow: none;
  font-weight: 700;
}

.btn-secondary:hover:not(:disabled),
.btn-secondary:focus-visible:not(:disabled) {
  background-color: #e74c3c;
  color: white;
  transform: scale(1.05);
  outline: none;
}

.error-msg {
  color: #e74c3c;
  margin-top: 16px;
  font-weight: 600;
  font-size: 1rem;
}
</style>