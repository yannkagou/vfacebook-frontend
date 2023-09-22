import { defineStore } from "pinia";
import axios from "axios";

 export const useUserStore = defineStore({
    id: 'user',

    state: () => ({
        user: {
            isAuthenticated: false,
            id: null,
            email: null,
            firstname: null,
            lastname: null,
            birthdate: null,
            tel: null,
            avatar: null,
        }
    }),

    actions: {
        async initStore(){
            try {
                const response = await axios.get('/api/user/', {
                  withCredentials: true
                });
                this.user.id = response.data.id;
                this.user.email = response.data.email;
                this.user.firstname = response.data.firstname;
                this.user.lastname = response.data.lastname;
                this.user.birthdate = response.data.birthdate;
                this.user.tel = response.data.tel;
                this.user.avatar = response.data.get_avatar;
                this.user.isAuthenticated = true
                // console.log('userStore.user.id:', this.user.id);
              } catch (error) {
                console.error(error);
                // router.push('/login')
              }
        }
    }
 })