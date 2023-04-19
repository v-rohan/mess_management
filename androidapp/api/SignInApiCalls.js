import {BACKEND_URL} from '@env';
import {storage} from '../App';

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


export const scan = async data => {
  try {
    console.log(data + '   ffffffffff');
    const token = storage.getString('token');

    const response = await fetch(`${BACKEND_URL}verify/${data}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      //body: JSON.stringify(data),
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return {status: 500};
  }
};

export const codegen = async data => {
  try {
    const token = storage.getString('token');
    const response = await fetch(`${BACKEND_URL}generatecode/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify({mealType: 'EXTRA'}),
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return {status: 500};
  }
};

export const appLoginOrRegister = async data => {
  try {
    const response = await fetch(`${BACKEND_URL}googleapp/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response;
  } catch (err) {
    console.log(err);
    return {status: 500};
  }
};
