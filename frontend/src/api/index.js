
class EnvConfig {
  static backendUrl = 'http://localhost:8000';
}
export const getCheckToken = () =>{
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token missing');
  return token;
}

export const backendSignUpCall = async (name, email, password) => {
  const response = await fetch(`${EnvConfig.backendUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      password
    })
  });
  console.log(response.status);
  const data = await response.json();
  if (response.status >= 200 && response.status < 300) return data;
  throw new Error(data.message ? data.message : 'Request failed');
}

export const backendSignInCall = async (email, password) => {
  const response = await fetch(`${EnvConfig.backendUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  console.log(response.status);
  const data = await response.json();
  if (response.status >= 200 && response.status < 300) return data;
  throw new Error(data.message ? data.message : 'Request failed');
}

export const backendGetBalanceCall = async () => {
  const response = await fetch(`${EnvConfig.backendUrl}/users/details`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getCheckToken()}`
    }
  });
  const data = await response.json();
  if (response.status >= 200 && response.status < 300) return data;
  throw new Error(data.message ? data.message : 'Request failed');

}

export const backendUserAllCall = async () => {
  const response = await fetch(`${EnvConfig.backendUrl}/users/find`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getCheckToken()}`
    }
  });
  console.log(response.status);
  const data = await response.json();
  if (response.status >= 200 && response.status < 300) return data;
  throw new Error(data.message ? data.message : 'Request failed');
}

export const backendFindUserCall = async (name) => {
  const response = await fetch(`${EnvConfig.backendUrl}/users?name=${name}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getCheckToken()}`
    }
  });
  console.log(response.status);
  const data = await response.json();
  if (response.status >= 200 && response.status < 300) return data;
  throw new Error(data.message ? data.message : 'Request failed');
}

export const backendSendMoneyCall = async (receiver, amount) => {
  const response = await fetch(`${EnvConfig.backendUrl}/transaction/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getCheckToken()}`
    },
    body: JSON.stringify({
      receiver: receiver.toString(),
      amount: parseInt(amount, 10)
    })
  });
  console.log(response.status);
  const data = await response.json();
  if (response.status >= 200 && response.status < 300) return data;
  throw new Error(data.message ? data.message : 'Request failed');
}
export default EnvConfig;