import axios from 'axios'


const getApi = axios.create({
    // development
    baseURL:"http://127.0.0.1:8000",
    // baseURL:"https://zaobackend.pythonanywhere.com", 

    // production
    // baseURL:"https://highschoolbackend.codetestserver2022.icu",
    // timeout: 1000
})

export { getApi }