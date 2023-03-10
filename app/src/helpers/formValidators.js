// Валидаторы значений форм, возвращающие ошибку (обычно строку) или undefined

import { isISODate } from "helpers/validators";
import moment from "moment/moment";

export const isValue = (value) => {
  if (value === null || value === undefined || value === "")
    return "Введите значение";
};

export const isPositiveNumber = (value) => {
  if (Number(value) <= 0) return "Значение должно быть больше нуля";
};

export const isNegativeNumber = (value) => {
  if (Number(value) >= 0) return "Значение должно быть меньше нуля";
};

export const isZeroNumber = (value) => {
  if (Number(value) !== 0) return "Значение должно быть нулем";
};

export const required = (value) => {
  if (Array.isArray(value) && !value.length) return "Обязательное поле";
  if (value === false) return;
  if (!value) return "Обязательное поле";
  return;
};

export const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Неверный формат email. Пример: username@inbox.org"
    : undefined;

export const phoneNumber = (value) => {
  let lengthPhone = 0;
  if (typeof value === "string") {
    lengthPhone = (value.match(/_/g) || []).length;
  }
  return value &&
    lengthPhone !== 10 &&
    // eslint-disable-next-line no-useless-escape
    !/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i.test(value)
    ? "Неверный формат. Пример: +7 (999) 999-99-99"
    : undefined;
};

/**
 * Валидатор поля DatepickerReactFinalForm, проверяет корректность путем проверки на возможность
 * получения строки ISO 8601 c UTC 0 из значения.
 * @param {moment|null} value значение поля
 * @returns {string|undefined}
 */
export const isValidDate = (value) => {
  if (
    value === null ||
    (value instanceof moment && !isISODate(value.toISOString()))
  ) {
    return "Значение должно быть валидной меткой времени или даты";
  }
};

/**
 * Валидатор поля DatepickerReactFinalForm, проверяет корректность путем проверки на возможность
 * получения строки ISO 8601 c UTC 0 из значения или на соответствие пустому значению (null).
 * @param {moment|null} value значение поля
 * @returns {string|undefined}
 */
export const isValidDateWithNull = (value) => {
  if (
    value !== null &&
    value instanceof moment &&
    !isISODate(value.toISOString())
  ) {
    return "Значение должно быть валидной меткой времени или даты, или пустым значением";
  }
};

/**
 * Возвращает новый валидатор, собранный из нескольких валидаторов,
 * валидаторы будут применяться к значению до первой ошибки
 * @param validators валидаторы
 * @returns {(function(*): (*|undefined))|*}
 */
export default function composeValidators(...validators) {
  return function composedValidator(value) {
    for (let i = 0; i < validators.length; i++) {
      const error = validators[i](value);
      if (error) return error;
    }
  };
}
