import {BACKEND_URL} from '@env';
export const register = async data => {
  try {
    const response = await fetch(`${BACKEND_URL}register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return {status: 500};
  }
};
export const login = async data => {
  try {
    const response = await fetch(`${BACKEND_URL}login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return {status: 500};
  }
};
