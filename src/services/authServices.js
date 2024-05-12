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
