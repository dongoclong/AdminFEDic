import axios from 'axios';

export const login = async (username, password) => {
  try {
    const response = await axios.post('https://fastapi-dic.vercel.app/api/v1/user/login', {
      username,
      password
    });
    console.log(response.data)
    return response.data  
  } catch (error) {
    console.error(error);
    throw error;
  }
};
