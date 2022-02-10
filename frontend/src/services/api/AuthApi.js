import { instance, instanceWithAuth } from '../../services/axios';

// 공통되는 경로는 다음과 같이 별도로 정의해둠? (is this nesassary)
const USER = '/user/';

/* 회원가입 */
export const signup = async (user) => {
  const response = await instance.post(USER + 'signup', {
    userId: user.userId,
    password: user.password,
    userNickname: user.userNickname,
    userEmail: user.userEmail,
    userBirthday: user.userBirthday,
    userGender: user.userGender,
    categories: user.categories,
    userProfilePhoto: user.userProfilePhoto,
  });
};

/* 로그인 */
export const login = async (userData) => {
  const response = await instance.post('/user/login', userData);
  if (response.data.accessToken) {
    // save JWT token
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

/* 로그아웃 */
export const logout = () => {
  // remove JWT from LocalStorage
  localStorage.removeItem('user');
};
