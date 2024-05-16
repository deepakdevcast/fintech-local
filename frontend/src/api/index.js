
class EnvConfig {
  static backendUrl = 'http://localhost:8000';
}
export const getCheckToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return { isToken: false, token: null };
  return {isToken: true, token};
}

export const verifyToken = async () => {
  const token = getCheckToken();
  if (token.isToken){
    const response = await fetch(`${EnvConfig.backendUrl}/verify`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.token}`
      }
    });
    if (response.status >= 200 && response.status < 300) return true;
  }
  return false;
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
  const data = await response.json();
  if (response.status >= 200 && response.status < 300) return data;
  throw new Error(data.message ? data.message : 'Request failed');
}

export const backendGetBalanceCall = async () => {
  const response = await fetch(`${EnvConfig.backendUrl}/accounts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getCheckToken().token}`
    }
  });
  const data = await response.json();
  if (response.status >= 200 && response.status < 300) return data;
  throw new Error(data.message ? data.message : 'Request failed');

}

export const backendUserAllCall = async () => {
  const response = await fetch(`${EnvConfig.backendUrl}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getCheckToken().token}`
    }
  });
  const data = await response.json();
  if (response.status >= 200 && response.status < 300) return data;
  throw new Error(data.message ? data.message : 'Request failed');
}

export const backendFindUserCall = async (name) => {
  const response = await fetch(`${EnvConfig.backendUrl}/users?name=${name}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getCheckToken().token}`
    }
  });
  const data = await response.json();
  if (response.status >= 200 && response.status < 300) return data;
  throw new Error(data.message ? data.message : 'Request failed');
}

export const backendSendMoneyCall = async (receiver, amount) => {
  const response = await fetch(`${EnvConfig.backendUrl}/transaction/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getCheckToken().token}`
    },
    body: JSON.stringify({
      receiver_id: receiver.toString(),
      amount: parseInt(amount, 10)
    })
  });
  const data = await response.json();
  if (response.status >= 200 && response.status < 300) return data;
  throw new Error(data.message ? data.message : 'Request failed');
}
export default EnvConfig;