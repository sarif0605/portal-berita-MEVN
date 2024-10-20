import axios from "axios";

const customeApi = axios.create({
  baseURL: "/api/v1",
});

export default customeApi;
