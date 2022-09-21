import * as Yup from 'yup';

export const signInValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

export const signUpValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  fullName: Yup.string()
    .matches(
      /^\p{Lu}\p{Ll}+(?: \p{Lu}\p{Ll}+)+$/u,
      'Please enter a valid full name'
    )
    .required('Required'),
  password: Yup.string()
    .required('Required')
    .min(12, 'Password should be of a minimum 12 characters length'),
  repeatPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Passwords do not match'),
});
