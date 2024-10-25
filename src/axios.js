import axios from "axios";
import { errorToast } from "./toast";

export const registerUser = async (userName, email, password) => {
  try {
    const body = { userName, email, password };
    const response = await axios.post(`user/register`, body);
    if (response.status === 201) {
    }
  } catch (error) {
    errorToast(error.response.data.message);
  }
};

export const loginUser = async (email, password) => {
  try {
    const body = { email, password };
    const response = await axios.post(`user/login`, body);
    if (response.status === 201) {
      localStorage.setItem("accessToken", response.data.token);
    }
    return response;
  } catch (error) {
    errorToast(error.response.data.message);
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response;
  } catch (error) {
    errorToast(error.response.data.message);
  }
};

export const getAllContacts = async () => {
  try {
    const response = await axios.get(`contacts`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response;
  } catch (error) {
    errorToast(error.response.data.message);
  }
};

export const editContact = async (Id, Name, Phone_Number) => {
  try {
    const body = { Name, Phone_Number };
    const response = await axios.put(`contacts/${Id}`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response;
  } catch (error) {
    errorToast(error.response.data.message);
  }
};

export const addNewContact = async (Name, Phone_Number) => {
  try {
    const body = { Name, Phone_Number };
    const response = await axios.post(`contacts`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response;
  } catch (error) {
    errorToast(error.response.data.message);
  }
};

export const deleteContact = async (Id) => {
  try {
    const response = await axios.delete(`contacts/${Id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response;
  } catch (error) {
    errorToast(error.response.data.message);
  }
};
