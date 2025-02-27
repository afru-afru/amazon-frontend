import axios from "axios";

const axiosInstanc=axios.create({
    baseURL:"https://amazon-api-deploy-d0ek.onrender.com/"
});
export {axiosInstanc}