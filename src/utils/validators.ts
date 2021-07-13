import * as _ from 'lodash';

interface ValidatorFunc<T = string> {
  (rule: any[], value: T, callback: (errors: any[]) => void): void;
}

export const maxAmount = (amount: number, msg?: string): ValidatorFunc => (
  _,
  value,
  callback,
) => {
  const errors = [];

  if (value && Number(value) > amount) {
    const defaultMsg = `Exceeded the maximum amount`;
    errors.push(msg || defaultMsg);
  }

  callback(errors);
};

export const minAmount = (amount: number, msg?: string): ValidatorFunc => (
  _,
  value,
  callback,
) => {
  const errors = [];

  if (value && Number(value) < amount) {
    const defaultMsg = `Minimum amount is ${amount}`;
    errors.push(msg || defaultMsg);
  }

  callback(errors);
};

export const moreThanZero = {
  validator(
    rule: any[],
    value: any,
    callback: (errors: any[]) => void,
    storeData?: any,
  ) {
    const errors = [];

    if (!value || Number(value) <= 0) {
      errors.push('Value must be more than 0');
    }

    callback(errors);
  },
  validateType: 'requiredValidator',
};
