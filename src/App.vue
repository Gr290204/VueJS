<template>
  <Menubar :model="items">
    <template #start>
      <span>
        <img src="\src\assets\logo.svg" width="50" alt="My SVG Icon"/>
      </span>
    </template>
    <template #item="{item}">
      <a class="flex items-center ml-6 p-4">
        <router-link v-if="item.route" :to="item.route" class="flex items-center">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
        </router-link>
      </a>
    </template>
    <template #end>
      <div class="flex items-center justify-end gap-4">
        <div v-if="isAuthenticated && user" class="flex items-center">
          <span class="pi pi-user ">{{ user.name }}</span>
          <Button @click="logout">Выйти</Button>
        </div>
        <div v-else>
          <form @submit.prevent="login" class="flex items-center space-x-2">
            <InputText v-model="email" type="email" id="email" required placeholder="Логин" class="m-2 sm:w-auto" :class="{'p-invalid': authError}"/>
            <InputText v-model="password" type="password" id="password" required placeholder="Пароль" class="m-2 sm:w-auto" :class="{'p-invalid': authError}"/>
            <Button type="submit">Войти</Button>
            <div class="ml-2"><small v-if="authError" class="error">{{ authError }}</small></div>
          </form>
        </div>
      </div>
    </template>
  </Menubar>
  <router-view></router-view>
</template>
<script>
import { useAuthStore } from '@/stores/authStore';
import Button from "primevue/button";
import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";

export default {
  components: {Button, Menubar, InputText},
  data() {
    return {
      email: '',
      password: '',
      authStore: useAuthStore(),
      items: [
        {
          label: 'Главная страница',
          icon: 'pi pi-fw pi-home',
          route: '/',
          shortcut: 'Ctrl + H',
          submenu: [],
        },


        {
          label: 'Клиенты',
          icon: 'pi pi-fw pi-folder',
          route: '/clients',

        },

        {
          label: 'Цветы',
          icon: 'pi pi-fw pi-box',
          route: '/flowers',
        },
      ],
    };
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated;
    },
    user() {
      return this.authStore.user;
    },

    authError() {
      return this.authStore.errorMessage;
    },
  },

  methods: {
    logout() {
      this.authStore.logout();
    },

    login() {
      this.authStore.login({email: this.email, password: this.password});
    },
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authStore.isAuthenticated = true;
      this.authStore.getUser();
    }
  },
};
</script>
<style scoped>
 a {
  text-decoration: none;
  color: inherit;
}
.error {
  color: red;

}
</style>