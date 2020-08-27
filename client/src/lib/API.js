const API_URL = 'http://localhost:5000/v1/transactions';

export async function getTransactions() {
  const response = await fetch(API_URL);
  return response.json();
}

export async function addTransaction(transaction, type) {
  const newTransaction = transaction;
  newTransaction.type = type;
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(newTransaction),
    headers: {
      'content-type': 'application/json',
    },
  });
  return response.json();
}

export async function removeTransaction(transaction) {
  const response = await fetch(`${API_URL}/${transaction._id}`, {
    method: 'DELETE',
    body: JSON.stringify(transaction),
    headers: {
      'content-type': 'application/json',
    },
  });
  return response.json();
}
