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

export type SubmitButton = {
  setSubmitted: Function,
  setMessage: Function,
  setOpen: Function,
}