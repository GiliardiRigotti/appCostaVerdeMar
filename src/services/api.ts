import axios from 'axios'

const api = axios.create({
    baseURL: "http://10.1.0.81:3333/"
})

const urls = {
    user: "user",
    login:"login",
    notification: "notification",
    tip: "tip"
}

export { api, urls }