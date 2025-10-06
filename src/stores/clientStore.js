// внутри clientStore.js
import { defineStore } from 'pinia';
import { apiService } from './apiService';

export const useClientStore = defineStore('client', {
    state: () => ({
        clients: [],
        loaded: false,
        errorMessage: '',
    }),
    actions: {
        async fetchClients(token) {
            try {
                if (!token) {
                    console.warn('Нет токена, пропускаем загрузку клиентов');
                    return;
                }
                if (this.loaded) {
                    return;
                }
                const data = await apiService({ token, url: 'http://127.0.0.1:8000/api/client' });
                this.clients = data;
                this.loaded = true;
                this.errorMessage = '';
            } catch (error) {
                this.errorMessage = 'Ошибка при загрузке клиентов';
            }
        }
    }
});