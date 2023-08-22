import {useSelector} from 'react-redux';

export const getFromRedux = (path = '') => {
  if (path === 'token') {
    const token = useSelector(state => state.Authentication.isLogin.token);
    return token;
  } else if (path === 'user') {
    const user = useSelector(state => state.Authentication.isUser);
    return user;
  } else {
    const dataAuthRedux = useSelector(state => state.Authentication);
    return dataAuthRedux;
  }
};
