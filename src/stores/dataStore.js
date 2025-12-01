
import { defineStore } from 'pinia';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useDataStore = defineStore('data', {
    state: () => ({
        clients: [],
        clients_total: null,
        items: [],
        errorCode: "",
        errorMessage: "",
        flowers: [],
        flowers_total: null,
    }),
    actions: {


        async create_flower(formData) {
            this.errorMessage = "";
            try {
                const response = await axios.post(
                    backendUrl + '/flower',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }
                    }
                );

                this.errorCode = response.data.code;
                this.errorMessage = response.data.message;

            } catch (error) {

                if (error.response) {
                    this.errorCode = 11;
                    this.errorMessage = error.response.data.message;
                    console.log(error);

                } else if (error.request) {
                    this.errorCode = 12;
                    this.errorMessage = error.message;
                    console.log(error);

                } else {
                    this.errorCode = 13;
                    console.log(error);
                }
            }
        },


        async get_clients(page = 0, perpage = 5) {
            this.errorMessage = "";

            try {
                const response = await axios.get(backendUrl+'/client', {
                    params: {
                        page: page,
                        perpage: perpage
                    },
                    headers: {
                        Authorization: 'Bearer ' + this.token

                    }
                });

                this.clients = response.data;
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    console.log(error);
                }
            }
        },

    async get_clients_total() {
        this.errorMessage = "";
        try {
        const response = await axios.get(backendUrl + '/client_total');
        this.clients_total = response.data;
    } catch(error) {
        if (error.response) {
            this.errorMessage = error.response.data.message;
            console.log(error);
        } else if (error.request) {
            this.errorMessage = error.message;
            console.log(error);
        } else {
            console.log(error);
        }
    }
},
        async get_flowers(page = 0, perpage = 5) {
            this.errorMessage = "";
            try {
                const response = await axios.get(backendUrl + '/flower', {
                    params: {
                        page: page,
                        perpage: perpage
                    },
                    headers: {
                        Authorization: 'Bearer ' + this.token
                    }
                });
                this.flowers = response.data;
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    console.log(error);
                }
            }
        },


        async get_flowers_total() {
            this.errorMessage = "";
            try {
                const response = await axios.get(backendUrl + '/flower_total');
                this.flowers_total = response.data;
                console.log('flowers = ', this.flowers_total);
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message;
                    console.log(error);
                } else if (error.request) {
                    this.errorMessage = error.message;
                    console.log(error);
                } else {
                    console.log(error);
                }
            }
        }
    },});



