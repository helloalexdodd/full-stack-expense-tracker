// import axios from 'axios';

// const USER_URL = 'http://localhost:5000/v1/users/register';

// export async function registerUser(user) {
//   try {
//     const { data } = await axios(USER_URL, {
//       method: 'POST',
//       data: user,
//     });
//     localStorage.setItem('x-auth-token', data.token);
//     localStorage.setItem('user', data.username);

//     axios.defaults.headers.common['x-auth-token'] = data.token;

//     delete data.token;
//     return data;
//   } catch (err) {
//     return err.response.data.details[0];
//   }
// }

// export default registerUser;
