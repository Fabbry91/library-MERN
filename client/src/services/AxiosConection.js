import axios from 'axios';

const instance= axios.create({
    //baseURL:`http://localhost:4000/api`,
    baseURL:`${process.env.REACT_APP_API_URL}`
})

export default instance;