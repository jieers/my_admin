import axios from "axios";

// const url =  'http://localhost:8080/api'
export function request(config) {
    const instance = axios.create({
        baseURL: '',
        timeout: 5000
    })
    //1)请求拦截
    instance.interceptors.request.use(suc => {
        // console.log(suc);
        return suc
    }, err => {
        // console.log(err);
    })
    //2)响应拦截
    instance.interceptors.response.use(suc => {
        // console.log(suc);
        return suc
    },err => {
        // console.log(err);
    })
    return instance(config)
}