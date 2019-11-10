import axios from 'axios'

const SERVER_URL = 'http://localhost:3030';

export default {

    getpokedex() {
        const url = SERVER_URL + `/api/cards`;
        return axios.get(url).then(response => response.data);
    },

}