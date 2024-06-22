import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://diag-pulse-server-site.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;