<template>
  <DataTable
      :value="flowers"
      :lazy="true"
      :loading="dataStore.loading"
      :paginator="true"
      :rows="perpage"
      :rowsPerPageOptions="[2, 5, 10]"
      :totalRecords="flowers_total"
      @page="onPageChange"
      responsive-layout="scroll"
      :laading="true"
      :first="offset"
  >

    <Column field="id" header="№"/>
    <Column field="flower_name" header="Цветок" />
    <Column field="flower_price" header="Цена" />
    <Column field="flower_remains" header="Остаток" />
    <Column header="Изображение" class="img-col">
      <template #body="slotProps">
        <img
            v-if="slotProps.data.picture_url"
            :src="slotProps.data.picture_url"
            :alt="slotProps.data.flower_name || 'Цветок'"
            class="flower-img"
        />
        <span v-else>—</span>
      </template>
    </Column>
  </DataTable>

  <div class="text-end">
    <Button type="button" @click="this.$router.push('/createFlower')" icon="pi pi-plus" label="Добавить цветок" />
  </div>
</template>


<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useDataStore } from '@/stores/dataStore';
import Button from "primevue/button";

export default {
  name: "Flowers",
  components: { DataTable, Column, Button},
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    };
  },
  computed: {
    flowers() {
      return this.dataStore.flowers;
    },
    flowers_total() {
      return this.dataStore.flowers_total;
    },
  },
  mounted() {
    console.log('flowers component MOUNTED!');
    this.dataStore.get_flowers();
    this.dataStore.get_flowers_total();
    console.log('Flowers=', this.flowers);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_flowers(this.offset / this.perpage,  this.perpage );
    }
  }
}
</script>

<style scoped>
.flower-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  object-position: center;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  display: block;
  background-color: #f7fafc;
}

/* На мобильных — уменьшаем картинку */
@media (max-width: 768px) {
  .flower-img {
    width: 48px;
    height: 48px;
  }
}

/* На очень маленьких экранах */
@media (max-width: 480px) {
  .flower-img {
    width: 40px;
    height: 40px;
  }
}
</style>