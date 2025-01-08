import axios from "axios";

export const _axios = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});
