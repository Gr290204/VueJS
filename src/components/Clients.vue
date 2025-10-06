<script setup>
import { onMounted } from 'vue';
import { useClientStore } from '@/stores/clientStore'; // путь к вашему store
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const clientStore = useClientStore();

onMounted(() => {
  // Передаем токен из authStore
  clientStore.fetchClients(authStore.token);
});
</script>

<template>
  <div>
    <h2>Клиенты</h2>
    <div v-if="clientStore.errorMessage" class="error">{{ clientStore.errorMessage }}</div>
    <table v-if="clientStore.clients.length">
      <thead>
      <tr>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Адрес</th>
        <th>Номер телефона</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="client in clientStore.clients" :key="client.client_number">
        <td>{{ client.client_name }}</td>
        <td>{{ client.client_surname }}</td>
        <td>{{ client.client_adress }}</td>
        <td>{{ client.client_number }}</td>
      </tr>
      </tbody>
    </table>
    <div v-else>
      Нет данных о клиентах.
    </div>
  </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>