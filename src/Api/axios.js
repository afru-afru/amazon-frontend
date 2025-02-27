import axios from "axios";

const axiosInstanc=axios.create({
    baseURL:"http://amazon-api-deploy-d0ek.onrender.com/"
});
export {axiosInstanc}