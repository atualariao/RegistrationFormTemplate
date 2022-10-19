import { specialCharas, philPhone } from '../utils/Regex';
import * as yup from 'yup';


export const validationRegisterSchema = yup.object({
    firstName: yup.string().trim().required('First Name is required'),
    middleName: yup.string(), 
    lastName: yup.string().trim().required('Last Name is required'),
    email: yup
        .string()
        .email('Must be a valid email')
        .required('Email is required'),
    mobilenum: yup.string().trim().matches(philPhone, 'Mobile Number is invalid').required('Mobile Number is required'),
    username: yup.string().trim().required('Username is required').min(4).max(10),
    password: yup.string().required().min(6).max(15).matches(specialCharas, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
    confirmPassword: yup.string().required()
    .oneOf([yup.ref('password'), null], 'Password does not match'),
    })
 
    