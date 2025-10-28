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
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useDataStore } from '@/stores/dataStore';

export default {
  name: "Flowers",
  components: { DataTable, Column },
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
</style>