import axios from "axios";
import Cookies from 'js-cookie'


let csrfToken = Cookies.get('csrfToken')

export default async (url, method, data, query) => {
    let requestUrl = "/api" + url
    let requestMethod = method || 'GET'
    let requestHeaders = {
        "Content-type": "application/json",
        "Accept": "application/json",
        "x-csrf-token":csrfToken
    }
    let res = await axios({
        method: requestMethod,
        url: requestUrl,
        headers: requestHeaders,
        data: data,
        params: query
    })
    return res
}