import { sleep } from "@/utils/helpers";
import mockAuthUsers from "@/utils/mocks/mockAuthUsers";

export const loginApiService = async (data) => {
  const { password, email } = data;
  await sleep(3000);

  const user = mockAuthUsers.find(
    (u) => (u.email === email ) && u.password === password
  );
  if (user) {
    return { data: user };
  }
  return { error: 'Wrong username or password.' };
};



export const resetPasswordLinkApiService = async (data) => {
  const { email } = data;
  await sleep(2000);

  const user = mockAuthUsers.find(
    (u) => (u.email === email )
  );

  if (user) {
    return { message: `Reset Password Link is send at your Email : ${email}` };
  }
  return { error: 'You have entered Wrong Email.' };
};


export const resetPasswordApiService = async (data) => {
  const { email } = data;
  await sleep(2000);

  const user = mockAuthUsers.find(
    (u) => (u.email === email )
  );

  if (user) {
    return { message: `Your Password is reset` };
  }
  return { error: 'You have entered Wrong Email.' };
};
