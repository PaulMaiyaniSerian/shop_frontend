import { getApi } from "./endpoint"



import { 
    REGISTER_URL ,
    LOGIN_URL,
    CAROUSEL_URL,
    PRODUCTS_INTRO_URL,
    CATEGORY_LIST_URL,
    SHOPPING_SESSION_CREATE_URL,
    ADD_TO_CART_URL,
    FETCH_CART_ITEMS_URL,
    FETCH_CART_ITEMS_TOTAL,
    UPDATE_CART_URL,
} from "./constants"


 // .then(response => {
    //     successMessage.value = response.data
    //     // call success Toast here
    //     stop_loader(is_loading)
    // }).catch(error => {
    //     // console.log(error)
    //     // check whether error is from network or backend
    //     if(error.code == "ERR_NETWORK"){
    //         console.log("Network Error")
    //     }else{
    //         // error from the backend
    //         // console.log(error.response.data)
    //         const error_data = error.response.data
    //         // console.log(error_data)
    //         emailErrors.value = error_data.email
    //         passwordErrors.value = error_data.password
    //         password2Errors.value = error_data.password2
    //     }
    //     stop_loader(is_loading)
    // })



export const registerApi = async(data) => {
    return getApi.post(REGISTER_URL, data)
}


export const loginApi = async(data) => {
    return getApi.post(LOGIN_URL, data)
}

export const getCarouselProductsApi = async() => {
    return getApi.get(CAROUSEL_URL)
}

export const getCategoryIntroApi = async(name) => {
    return getApi.get(PRODUCTS_INTRO_URL, {
        params:{
            category_name : name
        }
    })
}

export const getCategoriesApi = async() => {
    return getApi.get(CATEGORY_LIST_URL)
}


export const createDeviceShoppingSessionApi = async(data) => {
    const formatted_data = {
        device_id: data.device_id
    }

    if(data.access_token){
        return getApi.post(SHOPPING_SESSION_CREATE_URL, formatted_data, {
            headers:{
                Authorization : `Bearer ${data.access_token}`
            }
        }) 
    }


    return getApi.post(SHOPPING_SESSION_CREATE_URL, formatted_data)
}


export const addToCartApi = async(data) => {

    const formatted_data = {
        product_id: data.product_id,
        device_id: data.device_id,
        qty: data.qty,
    }

    if(data.access_token){
        return getApi.post(ADD_TO_CART_URL, formatted_data, {
            headers:{
                Authorization : `Bearer ${data.access_token}`
            }
        })
    }

    return getApi.post(ADD_TO_CART_URL, formatted_data)
    
}


export const updateCartApi = async(data) => {
    const formatted_data = {
        product_id: data.product_id,
        device_id: data.device_id,
        qty: data.qty,
    }

    if(data.access_token){
        return getApi.put(UPDATE_CART_URL, formatted_data, {
            headers:{
                Authorization : `Bearer ${data.access_token}`
            }
        })
    }

    return getApi.put(UPDATE_CART_URL, formatted_data)
    
}


export const getCartApi = async(data) => {


    if(data.access_token){
        return getApi.get(FETCH_CART_ITEMS_URL, {
            headers:{
                Authorization : `Bearer ${data.access_token}`
            },
            params: {
                device_id : data.device_id
            }
        })
    }

    return getApi.get(FETCH_CART_ITEMS_URL, {
        params: {
            device_id : data.device_id
        }
    })
    
}


export const getCartTotalApi = async(data) => {


    if(data.access_token){
        return getApi.get(FETCH_CART_ITEMS_TOTAL, {
            headers:{
                Authorization : `Bearer ${data.access_token}`
            },
            params: {
                device_id : data.device_id
            }
        })
    }

    return getApi.get(FETCH_CART_ITEMS_TOTAL, {
        params: {
            device_id : data.device_id
        }
    })
    
}


