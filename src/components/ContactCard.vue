<template>
    <div class="card">
        <div class="info">
            <h2>{{ contact.name }}</h2>
            <p><strong>Teléfono:</strong> {{ contact.phone }}</p>
        </div>
        <div class="actions">
            <button @click="$emit('edit', contact)" class="btn edit" aria-label="Editar contacto">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
            </button>
            <button @click="$emit('delete', contact.id)" class="btn delete" aria-label="Eliminar contacto">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
            </button>
        </div>
    </div>
</template>
  
<script setup>
    defineProps({
        contact: {
        type: Object,
        required: true
        }
    })
</script>
  
<style scoped>
    .card {
        background: #fff;
        border-radius: 20px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        padding: 20px;
        width: 280px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    
    .info h2 {
        margin: 0 0 10px;
        font-size: 1.4rem;
        color: #2c3e50;
    }
    
    .info p {
        margin: 4px 0;
        color: #555;
    }
    
    .actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 15px;
    }
    
    .btn {
        background-color: transparent;
        border: none;
        cursor: pointer;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s ease;
        color: white;
    }
    
    .btn .icon {
        width: 18px;
        height: 18px;
        stroke: currentColor;
    }
    
    .edit {
        background-color: #3498db;
    }
    
    .edit:hover {
        background-color: #2980b9;
    }
    
    .delete {
        background-color: #e74c3c;
    }
    
    .delete:hover {
        background-color: #c0392b;
    }
</style>  