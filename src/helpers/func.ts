// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isEmpty = (str: string): boolean => {
  if (str.trim() === '') return true;
  return false;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isEmail = (email: string): boolean => {
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(regExp) !== null ? true : false;
};
const checkLength = (str: string, min: number, max: number): boolean => {
  return min <= str.length && str.length <= max;
};

function emailValidation(email: string): boolean {
  let isValid: boolean = true;
  isValid = !isEmpty(email) && isValid;
  isValid = isEmail(email) && isValid;
  return isValid;
}

function passwordValidation(password: string) {
  let isValid: boolean = true;
  isValid = !isEmpty(password) && isValid;
  isValid = checkLength(password, 6, 10) && isValid;
  return isValid;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function dataValidation(email: string, password: string) {
  let isValid: boolean = emailValidation(email) && passwordValidation(password);
  return isValid;
}

export {
  isEmail,
  isEmpty,
  checkLength,
  dataValidation,
  passwordValidation,
  emailValidation,
};
