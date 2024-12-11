import axios from 'axios'

export default axios.create({
    baseURL: 'https://alncars-backend-production.up.railway.app/'
})