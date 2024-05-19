import { notification } from 'ant-design-vue';

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


export function isTokenExpired(token) {
  const decoded = jwt_decode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
}


const showNotifications = (description, error = false, apiStatus = 200) => {
  if (error) {
    notification['error']({
      message: `Error ${apiStatus}`,
      description,
    });
  } else {
    notification['success']({
      message: 'Success',
      description,
    });
  }
};

export default showNotifications;
