import { defineStore } from "pinia";
import { v4 } from "uuid";
import { 
    createDeviceShoppingSessionApi,
    addToCartApi,
    getCartApi,
    updateCartApi,
} from "../api/api_endpoint";


import { show_popup_success , show_popup_error} from '@/helpers/notifications.js'


export const useCartStore = defineStore({
  id: "cartStore",
  state: () => ({
    device_id: localStorage.getItem("device_id"),
    cart_items: [],
    cart_count: 0
  }),
  getters: {
    getDeviceId: (state) => (state.device_id),
    getCartItems : (state) => (state.cart_items),
    getCartCount: (state) => (state.updateCartCount()),
  },

  actions: {
    updateCartCount(){
        var count = 0
        // //(this.cart_items.length, this.cart_items)
        this.cart_items.map((cart_item) => {
            count += cart_item.quantity
        })

        // //(this.cart_items)

        return count
    },
    createDeviceShoppingSession(data){
        // //(data)
        createDeviceShoppingSessionApi(data)
        .then(response => {
            // //(response.data)
          }).catch(error => {
              // //(error)
              // check whether error is from network or backend
              if(error.code == "ERR_NETWORK"){
                  //("Network Error")
                //   show_popup_error(toast, "Cannot Connect to the server", "Network Error")
              }else{
                  // error from the backend
                  // //(error.response.data)
                  const error_data = error.response.data
                  //(error_data)
                //   show_popup_error(toast, "Error Loading Carousel", "Error")
              }
              // stop_loader(is_loading)
      
          })
    },


    getCartItemsFromServer(data){
        // api endpoint call to get cart items
        // //(data)
        getCartApi(data)
        .then(response => {
            // //(response.data)
            this.cart_items = response.data
            //("inited", this.cart_items)
            // show_popup_success(toast, "Product Added To Cart Successully", "Cart Add SuccessFul")
          }).catch(error => {
              // //(error)
              // check whether error is from network or backend
              if(error.code == "ERR_NETWORK"){
                  //("Network Error")
                  show_popup_error(toast, "Cannot Connect to the server", "Network Error")
              }else{
                  // error from the backend
                  // //(error.response.data)
                  const error_data = error.response.data
                  //(error_data)
                //   show_popup_error(toast, "Error Adding To cart", "Cart Error")
              }
              // stop_loader(is_loading)
      
          })

    },
    setDeviceIdStorage(device_id){
        localStorage.setItem("device_id", device_id)
    },

    createNewDeviceID(){
        // created new device id and saves it in localstorage and finally the state
        const unique_uid = v4()
        this.device_id = unique_uid
        // upate localStorage
        this.setDeviceIdStorage(this.device_id)
    },

    clearCartItems(){
        // call cart items clear endpoint
        this.cart_items = []
    },


    addCartItem(data, toast){
        // send it to the api and check if response is 200 ok then set state
        addToCartApi(data)
        .then(response => {
            // //(response.data)
            // check if product exists in state
            // //(response.data)
            show_popup_success(toast, "Product Added To Cart Successully", "Cart Add SuccessFul")

            
            // this.cart_items.push(response.data)
             // check if product exists
            const cart_item = this.cart_items.find((cart_item) =>{
                if(cart_item.product_id == data.product_id){
                    return true
                }
            })

              // modify if item is found
            if(cart_item){
                this.cart_items.map((cart_object) => {
                    if(cart_object.product_id == data.product_id){
                        cart_object.quantity += 1
                        return product
                    }else{
                        return 
                    }
                })
                // //("item found modifying qty", this.cart_items)

            }else{
                // call api endpoint to add to cart
                this.cart_items.push(response.data)
                // //("item not found adding  object", this.cart_items)
            } 

            //("after add", this.cart_items)

          }).catch(error => {
              // //(error)
              // check whether error is from network or backend
              if(error.code == "ERR_NETWORK"){
                  //("Network Error")
                  show_popup_error(toast, "Cannot Connect to the server", "Network Error")
              }else if(error.response){
                  // error from the backend
                  // //(error.response.data)
                  const error_data = error.response.data
                  //(error_data)
                  show_popup_error(toast, "Error Adding To cart", "Cart Error")
              }
              // stop_loader(is_loading)
      
          })
        
    },
    updateCartItem(data, toast, refreshCartApi){
        // send it to the api and check if response is 200 ok then set state
        //(this.cart_items)
        // send it to the api and check if response is 200 ok then set state
        updateCartApi(data)
        .then(response => {
            // //(response.data)
            // check if product exists in state
            // //(response.data)
            show_popup_success(toast, "Product Added To Cart Successully", "Cart Add SuccessFul")
            refreshCartApi()
            // this.cart_items.push(response.data)
             // check if product exists
            const cart_item = this.cart_items.find((cart_item) =>{
                //(cart_item.product_id, data.product_id)
                if(cart_item.product_id == data.product_id){
                    return true
                }
            })
            //(data.quantity, "data qty")

              // modify if item is found
            if(cart_item){
                this.cart_items.map((cart_object) => {
                    if(cart_object.product_id == data.product_id){
                        cart_object.quantity = data.qty
                        return product
                    }else{
                        return 
                    }
                })
                // //("item found modifying qty", this.cart_items)

            }else{
                //("shouldnt reach here")
                // call api endpoint to add to cart
                // this.cart_items.push(response.data)
                // //("item not found adding  object", this.cart_items)
            } 


          }).catch(error => {
              // //(error)
              // check whether error is from network or backend
              if(error.code == "ERR_NETWORK"){
                  //("Network Error")
                  show_popup_error(toast, "Cannot Connect to the server", "Network Error")
              }else if(error.response){
                  // error from the backend
                  // //(error.response.data)
                  const error_data = error.response.data
                  //(error_data)
                  show_popup_error(toast, "Error Adding To cart", "Cart Error")
              }
              // stop_loader(is_loading)
              
          })
        
    },

    addCartItemOld(product_obj){
        // check if product exists
        const item = this.cart_items.find((product) =>{
            if(product.id == product_obj.id){
                return true
            }
        })
        // modify if item is found
        if(item){
            this.cart_items.map((product) => {
                if(product.id == product_obj.id){
                    product.qty += 1
                    return product
                }else{
                    return 
                }
            })
            // //("item found modifying qty", this.cart_items)

        }else{
            // call api endpoint to add to cart
            this.cart_items.push(product_obj)
            // //("item not found adding  object", this.cart_items)
        }   
    },
   


  },
});
