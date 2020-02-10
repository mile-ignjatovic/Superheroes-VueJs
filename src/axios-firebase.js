import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://superheroes-7bfaa.firebaseio.com/'
})

export default instance