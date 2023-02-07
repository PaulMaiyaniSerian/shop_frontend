import { getApi } from "@/api/endpoint.js";
import { defineStore } from "pinia";
import { LOGIN_URL } from "../api/constants";
import { loginApi } from "../api/api_endpoint";


export const useAuthStore = defineStore({
  id: "authStore",
  state: () => ({
    accessToken: localStorage.getItem("access"),
    refreshToken: localStorage.getItem("refresh"),
    is_superuser:  null,
    is_user: null,
    is_seller: null,
    email: null,
  
  }),
  getters: {
    getEmail: (state) => (state.email),

    getAccessToken: (state) => (state.accessToken),

    getRefreshToken: (state) => (state.refreshToken),


  },
  actions: {
    getStorage(){
      const access = localStorage.getItem("access")
      const refresh = localStorage.getItem("refresh")

      this.accessToken = access;
      this.refreshToken = refresh;
    },

    getLoggedInUser(){
      this.getStorage()
      if(this.accessToken){
        const base64Token = this.accessToken.split('.')[1];
        const decodedToken = JSON.parse(window.atob(base64Token))
        // console.log(decodedToken)
        return decodedToken
      }else{
        return {
          "token_type": null,
          "exp": null,
          "iat": null,
          "jti": null,
          "user_id": null,
          "is_superuser": null,
          "is_seller": null,
          "is_staff": null,
          "email": null
        }
      }
      
    },
    

    updateStorage(access, refresh, email) {
      // decode token to check if its admin
      // todo

      this.accessToken = access;
      this.refreshToken = refresh;
      this.email = email

      localStorage.setItem("access",access)
      localStorage.setItem("refresh",refresh)

    },

    deleteStorage() {
      this.accessToken = null;
      this.refreshToken = null;

      localStorage.removeItem("access")
      localStorage.removeItem("refresh")

    },

    async userLogin(userCredentials){
      return new Promise((resolve, reject) => {
          // const url = '/accounts/test/'
          // console.log(userCredentials
            loginApi({
              email : userCredentials.email,
              password: userCredentials.password,
            }).then(
              // fullfilled
              (response) => {
              this.updateStorage(response.data.access, response.data.refresh, userCredentials.email)
              resolve(response)
              },
              // rejected
              (error) => {
                reject(error)
              }
          )


      })
    },

    userLogout(){
      this.deleteStorage()
    }
    
  },
});
