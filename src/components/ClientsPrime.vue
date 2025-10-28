
<template>
  <DataTable
      :value="clients"
      :lazy="true"
      :loading="dataStore.loading"
      :paginator="true"
      :rows="perpage"
      :rowsPerPageOptions="[2, 5, 10]"
      :totalRecords="clients_total"
      @page="onPageChange"
      responsive-layout="scroll"
      :laading="true"
      :first="offset"
  >
    <Column field="id" header="№"/>
    <Column field="client_name" header="Клиенты" />
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useDataStore } from '@/stores/dataStore';

export default {
  name: "Clients",
  components: { DataTable, Column },
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    };
  },
  computed: {
    clients() {
      return this.dataStore.clients;
    },
      clients_total() {
      return this.dataStore.clients_total;
    },
  },
  mounted() {
    console.log('clients component MOUNTED!');
    this.dataStore.get_clients();
    this.dataStore.get_clients_total();
    console.log('Clients=', this.clients);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_clients(this.offset / this.perpage,  this.perpage );
    }
  }
}
</script>
<style scoped>

</style>