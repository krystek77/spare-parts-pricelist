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

const roundToDecimals = (number: number): number =>
  Math.round((number + Number.EPSILON) * 100) / 100;

const stringToNumber = (s: string): number | undefined => {
  let num = parseFloat(s);
  if (isNaN(num)) return 0;
  return roundToDecimals(num);
};

const calculatePrice = (price: string, course: number): number | undefined => {
  let purchasePrice = stringToNumber(price);
  if (purchasePrice) {
    const inPL = roundToDecimals(purchasePrice * course);
    return inPL >= 500.0
      ? roundToDecimals(inPL * 1.35)
      : roundToDecimals(inPL * 1.65);
  }
  return 0;
};
const isSparePartName = (name: string): boolean => {
  const regExp = /^[a-zA-Ząćęłńóśźż\s]{10,}/;
  return !!name.match(regExp) ? true : false;
};
const isModel = (model: string): boolean => {
  const regExp = /^[A-Z]{1,}[0-9]*-[0-9]+/;
  return !!model.match(regExp) ? true : false;
};
const isYear = (year: string): boolean => {
  const regExp = /^([0-9]{4}$)/;
  return !!year.match(regExp) ? true : false;
};
const isPrice = (price: string) => {
  const regExp = /^([0-9]+\.?[0-9]{2}$)/;
  return !!price.match(regExp) ? true : false;
};

const prepareSlug = (name: string, model: string): string => {
  const regExp = /\s/g;
  const slug = (name + '-' + model).replace(regExp, '-').toLowerCase();
  return slug;
};
interface IAuthUser {
  avatar: string;
  userID: string;
  email: string;
  role: string;
  nick: string;
}
const initialValue: IAuthUser = {
  avatar: '',
  userID: '',
  email: '',
  role: '',
  nick: '',
};
const getAuthUser = (): IAuthUser => {
  const authUser: string | null = localStorage.getItem('authUser');
  return authUser ? JSON.parse(authUser) : initialValue;
};

export {
  isEmail,
  isEmpty,
  checkLength,
  dataValidation,
  passwordValidation,
  emailValidation,
  calculatePrice,
  isSparePartName,
  isModel,
  isYear,
  isPrice,
  roundToDecimals,
  stringToNumber,
  prepareSlug,
  getAuthUser,
};
