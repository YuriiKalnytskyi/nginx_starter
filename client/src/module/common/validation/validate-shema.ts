import * as Yup from 'yup';import { RegexConst, passwordError } from '../constants';export const validateSchema = {  name: Yup.string().required('is required').max(13),  boolean: Yup.boolean().required('is required'),  text: Yup.string().required('is required'),  email: Yup.string().email('Invalid email address').required('is required'),  phone: Yup.string().required('is required').min(12).max(12),  password: Yup.string()    .matches(RegexConst.LOWERCASE, passwordError[0])    .matches(RegexConst.CAPITAL, passwordError[1])    .matches(RegexConst.SPECIAL, passwordError[2])    .min(8, passwordError[3])    .required('is required')};export const commonValidation = {  email: validateSchema.email,  first_name: validateSchema.name,  last_name: validateSchema.name,  phone: validateSchema.phone};