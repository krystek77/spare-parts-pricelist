import {
  checkLength,
  dataValidation,
  emailValidation,
  isEmail,
  isEmpty,
  passwordValidation,
  calculatePrice,
  isSparePartName,
  isModel,
  isYear,
  isPrice,
  roundToDecimals,
  stringToNumber,
  prepareSlug,
} from './func';
import { ROLES, CURRENCY } from './enum';
import { RedirectUser, ProtectedRoute } from './routes';

export {
  checkLength,
  dataValidation,
  emailValidation,
  isEmail,
  isEmpty,
  passwordValidation,
  ROLES,
  CURRENCY,
  RedirectUser,
  ProtectedRoute,
  calculatePrice,
  isSparePartName,
  isModel,
  isYear,
  isPrice,
  roundToDecimals,
  stringToNumber,
  prepareSlug,
};
