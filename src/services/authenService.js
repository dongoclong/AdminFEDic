import axios from 'axios';

export const login = async (user_name, password) => {
  try {
    const response = await axios.post('http://localhost:8000/api/v1/user/login', {
      user_name,
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
