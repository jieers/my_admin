import {request} from "./request";
import axios from './axios'

export const getMenu = (params) => {
    return request({
        url: '/api/permission/getMenu',
        method: 'post',
        data: params
    })
}

// export const getMenu = (params) => {
//     return axios.request({
//         url: '/permission/getMenu',
//         method: 'post',
//         data: params
//     })
// }


export const getData = () => {
    return request({
        url: '/home/getData',
        method: 'get',
    })
}

export const getUser = (params) => {
    return request({
        url: '/user/getUser',
        method: 'get',
        data: params
    })
}


// export function getDetail(iid) {
//     return request({
//         url: '/detail',
//         params: {
//             iid
//         }
//     })
// }