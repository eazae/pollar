import { instance, instanceWithAuth } from '../../services/axios';

// 공통되는 경로는 다음과 같이 별도로 정의해둠? (is this nesassary)
const USER = '/user/';

/* 아이디 중복검사 */
export const checkId = async (userId) => {
  const response = await instance.get(USER + 'idcheck', {
    params: {
      userId: userId,
    },
  });
  return response.data;
};

/* 닉네임 중복검사 */
export const checkNickname = async (userNickname) => {
  const response = await instance.get(USER + 'nickcheck', {
    params: {
      userNickname: userNickname,
    },
  });
  return response.data;
};

/* 이메일 중복검사 */
export const checkEmail = async (userEmail) => {
  const response = await instance.get(USER + 'emailcheck', {
    params: { 
      userEmail: userEmail 
    },
  });
  return response.data;
};

/* 이메일 인증 메일 발송 */
export const emailConfirm = async (userEmail) => {
  const response = await instance.get(USER + 'confirmemail', {
    params: { 
      userEmail: userEmail 
    },
  });
  console.log(response.data);
  return response.data;
};

/* 이메일 인증 토큰 확인 */
export const emailToken = async (token) => {
  const response = await instance.get(USER + 'emailtoken', {
    params:{
        userEmail: token.userEmail,
        token: token.token,
      }
  });
  return response.data;
};
