import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .required('invalid password')
    .min(6, 'password to short'),
});
export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .required('invalid password')
    .min(6, 'password to short'),
});

export const updateProfileSchema = Yup.object().shape({
  nama: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  mobilephone: Yup.string()
    .required('Required')
    .min(10, 'to short')
    .max(14, 'to long'),
  // .max(15, 'to long'),
});
