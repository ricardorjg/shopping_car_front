import axios from 'axios'

const BASE_URL = 'http://localhost:3001/items'

const getAll = () => {
    return axios
            .get(BASE_URL)
            .then(response => response.data)
}

const getItem = (id) => {
    return axios
            .get(`${BASE_URL}/${id}`)
            .then(response => response.data)
}

const addItem = item => {
    return axios
            .post(BASE_URL, item)
            .then(response => response.data)
}

const updateItem = (prop, id) => {
    return axios
            .patch(`${BASE_URL}/${id}`, prop)
            .then(response => response.data)
}

const deleteItem = id => {
    return axios
            .delete(BASE_URL, id)
            .then(response => response.data)
}

export default {
    getAll,
    getItem,
    addItem,
    updateItem,
    deleteItem
}