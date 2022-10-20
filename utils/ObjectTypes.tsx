
//Object data types
export type SignUpFormValues = {
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    mobilenum: string,
    username: string,
    password: string,
    confirmPassword: string,
}

export type User = {
  firstName: string,
  middleName: string,
  lastName: string,
  email: string,
  mobilenum: string,
  username: string,
  password: string,
  confirmPassword: string,
}

export const initialValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  mobilenum: '',
  username: '',
  password: '',
  confirmPassword: '',
}

export type LoginValues = {
  username: string,
  password: string,
}

export type SubmitButton = {
  setSubmitted: (submitted: boolean) => void,
  setMessage: (message: string) => void,
  setOpen: (open: boolean) => void
}