import axios from 'axios';

export const login = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:34314/api/Authen/Login', {
      username,
      password
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
