import axios from 'axios';

const TRANSACTION_URL = 'http://localhost:5000/v1/transactions';
const USER_URL = 'http://localhost:5000/v1/users';

export async function getTransactions() {
  const response = await fetch(TRANSACTION_URL);
  return response.json();
}

export async function addTransaction(transaction, type) {
  const newTransaction = transaction;
  newTransaction.type = type;
  const response = await fetch(TRANSACTION_URL, {
    method: 'POST',
    body: JSON.stringify(newTransaction),
    headers: {
      'content-type': 'application/json',
    },
  });
  return response.json();
}

export async function removeTransaction(transaction) {
  console.log('transaction', transaction);

  const response = await fetch(`${TRANSACTION_URL}/${transaction._id}`, {
    method: 'DELETE',
    body: JSON.stringify(transaction),
    headers: {
      'content-type': 'application/json',
    },
  });
  return response.json();
}

export async function registerUser(user) {
  try {
    const response = await fetch(USER_URL, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json',
      },
    });
    const data = await response.json();
    localStorage.setItem('x-auth-token', data.access);
    axios.defaults.headers.common.Authorization = data.access;
    delete data.access;
    return data;
  } catch (err) {
    return err;
  }
}
