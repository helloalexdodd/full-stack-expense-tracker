// import axios from 'axios';

// const TRANSACTION_URL = 'http://localhost:5000/v1/transactions';

// export async function getTransactions() {
//   const token = localStorage.getItem('x-auth-token');
//   const response = await axios(TRANSACTION_URL, {
//     headers: {
//       'content-type': 'application/json',
//       'x-auth-token': token,
//     },
//   });

//   return response.data;
// }

// export async function addTransaction(transaction, type) {
//   const newTransaction = transaction;
//   const token = localStorage.getItem('x-auth-token');

//   newTransaction.type = type;
//   const response = await axios(TRANSACTION_URL, {
//     method: 'POST',
//     data: newTransaction,
//     headers: {
//       'content-type': 'application/json',
//       'x-auth-token': token,
//     },
//   });
//   return response.data;
// }

// export async function removeTransaction(transaction) {
//   const token = localStorage.getItem('x-auth-token');

//   const response = await axios(`${TRANSACTION_URL}/${transaction._id}`, {
//     method: 'DELETE',
//     data: transaction,
//     headers: {
//       'content-type': 'application/json',
//       'x-auth-token': token,
//     },
//   });
//   return response.data;
// }
