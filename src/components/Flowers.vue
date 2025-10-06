<script setup>
import { onMounted } from 'vue';
import { useFlowerStore } from '@/stores/flowerStore';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const flowerStore = useFlowerStore();

onMounted(() => {
  flowerStore.fetchFlowers(authStore.token);
});
</script>

<template>
  <div>
    <h2>Цветы</h2>
    <div v-if="flowerStore.errorMessage" class="error">{{ flowerStore.errorMessage }}</div>
    <table v-if="flowerStore.flowers.length">
      <thead>
      <tr>
        <th>Название цветка</th>
        <th>Цена</th>
        <th>Остатки</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="flower in flowerStore.flowers" :key="flower.id">
        <td>{{ flower.flower_name }}</td>
        <td>{{ flower.flower_price }}</td>
        <td>{{ flower.flower_remains }}</td>
      </tr>
      </tbody>
    </table>
    <div v-else>
      Нет данных о цветах.
    </div>
  </div>
</template>


<style scoped>
.error {
  color: red;
}
</style>