// import axios from 'axios';

// const USER_URL = 'http://localhost:5000/v1/users/login';

// export async function getUser(user) {
//   try {
//     const { data } = await axios(USER_URL, {
//       method: 'POST',
//       data: user,
//     });

//     localStorage.setItem('x-auth-token', data.token);
//     localStorage.setItem('user', data.username);
//     axios.defaults.headers.common['x-auth-token'] = data.token;
//     return data;
//   } catch (err) {
//     return err.response;
//   }
// }

// export default getUser;
