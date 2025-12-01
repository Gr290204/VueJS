
<template>
  <div class="flex justify-center">
    <form v-on:submit.prevent="createFlower" class="w-1/2 p-6">
      <h2 class="text-2xl mb-4 text-center" style="color: dimgrey">Создание Категории</h2>
      <div class="flex flex-col">
        <InputText type="text" placeholder="Введите Название" v-model="this.flowerName"/>
      </div>
      <div class="mb-4 mt-4">
        <label for="file" id="file-label" class="block text-md font-medium text-gray-500 border border-gray-300 rounded-md p-2">
          <span class="pi pi-upload mx-3"></span>Загрузить изображение
        </label>
        <input type="file" hidden id="file" name="file" v-on:change="changeCaption" required accept="image/*" />
      </div>

      <div class="flex flex-col mt-6">
        <Button type="submit" label="Создать" />
      </div>
    </form>
  </div>
  <Toast position="bottom-right" />
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useDataStore } from "@/stores/dataStore.js";
import Toast from "primevue/toast";

export default {
  name: "CreateFlower",
  components: {InputText, Button, Toast},
  data() {
    return {
      dataStore: useDataStore(),
      flowerName: '',
      flowerImage: null,
    };
  },
  computed: {
    errorMessage() {
      return this.dataStore.errorMessage;
    },
    errorCode() {
      return this.dataStore.errorCode;
    }
  },
  methods: {
    changeCaption(event) {
      const file = event.target.files[0];
      if (file) {
        document.getElementById('file-label').innerHTML = '<span class="pi pi-file mx-3"></span>' + file.name;
        this.flowerImage = file;
      } else {
        document.getElementById('file-label').innerHTML = '<span class="pi pi-upload mx-3"></span>Upload a file';
        this.flowerImage = null;
      }
    },


    async createFlower() {
      const formData = new FormData();
      formData.append('flower_name', this.flowerName);
      formData.append('image', this.flowerImage);
      await this.dataStore.create_flower(formData);

      if (this.errorCode > 0) {
        this.$toast.add({
          severity: 'error',
          summary: "Ошибка произошла внутри",
          detail: this.errorMessage,
          life: 4000
        });
      } else {
        this.$toast.add({
          severity: 'success',
          summary: 'Категория создана успешно',
          detail: this.errorMessage,
          life: 4000
        });
      }
    }
  }
}
</script>
<style scoped>
</style>
