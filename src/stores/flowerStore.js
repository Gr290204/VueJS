// внутри flowerStore.js
import { defineStore } from 'pinia';
import { apiService } from './apiService';

export const useFlowerStore = defineStore('flower', {
    state: () => ({
        flowers: [],
        loaded: false,
        errorMessage: '',
    }),
    actions: {
        async fetchFlowers(token) {
            try {
                if (!token) {
                    console.warn('Нет токена, пропускаем загрузку цветов');
                    return;
                }
                if (this.loaded) {
                    return;
                }
                const data = await apiService({ token, url: 'http://127.0.0.1:8000/api/flower' });
                this.flowers = data;
                this.loaded = true;
                this.errorMessage = '';
            } catch (error) {
                this.errorMessage = 'Ошибка при загрузке цветов';
            }
        }
    },
});