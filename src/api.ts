import axios from "axios";
import toast from "react-toastify";

const API_BASE = import.meta.env.VITE_API_BASE;

export const register = async (username: string, password: string) => {
  try {
    const { data } = await axios.post(API_BASE + "/api/user/register", {
      username,
      password,
    });

    localStorage.setItem("jwt", JSON.stringify(data.jwt));
    localStorage.setItem("username", JSON.stringify(data.user.username));
    window.location.reload();
  } catch (err) {
    console.error(err);
  }
};

export const login = async (username: string, password: string) => {
  try {
    const { data } = await axios.post(API_BASE + "/api/user/login", {
      username,
      password,
    });

    localStorage.setItem("jwt", JSON.stringify(data.jwt));
    localStorage.setItem("username", JSON.stringify(data.user.username));
    window.location.reload();
  } catch (err) {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    console.error(err);
  }
};

export const getURLs = async () => {
  try {
    const { data } = await axios.get(API_BASE + "/api/url/getURLs", {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("jwt") ?? ""
        )}`,
      },
    });

    return data;
  } catch (err) {
    console.error(err);
  }
};

export const createURL = async (long: string) => {
  try {
    const { data } = await axios.post(
      API_BASE + "/api/url/createURL",
      { long },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("jwt") ?? ""
          )}`,
        },
      }
    );
    return data
  } catch (error) {
    console.error(error);
  }
};
