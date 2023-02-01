import React from "react";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { styled, ThemeProvider } from "@mui/material/styles";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import Input from "../Input";
import { ruRU } from "./locales/ruRU";

const TYPES = {
  DATE: "date",
  TIME: "time",
  DATETIME: "datetime",
};

const INPUT_FORMATS = {
  [TYPES.DATE]: "DD.MM.YYYY",
  [TYPES.TIME]: "HH:mm",
  [TYPES.DATETIME]: "DD.MM.YYYY HH:mm",
};

const INPUT_PLACEHOLDER = {
  [TYPES.DATE]: "дд.мм.гггг",
  [TYPES.TIME]: "чч:мм",
  [TYPES.DATETIME]: "дд.мм.гггг чч:мм",
};

const VIEWS = {
  [TYPES.DATE]: ["year", "month", "day"],
  [TYPES.TIME]: ["hours", "minutes"],
  [TYPES.DATETIME]: ["year", "month", "day", "hours", "minutes"],
};

const styles = () => ({});

const StyledDatePicker = styled(DatePicker)(styles);
const StyledTimePicker = styled(TimePicker)(styles);
const StyledDateTimePicker = styled(DateTimePicker)(styles);

function renderDatepicker({ type, ...props }) {
  switch (type) {
    case TYPES.DATE:
      return <StyledDatePicker {...props} />;
    case TYPES.TIME:
      return <StyledTimePicker {...props} />;
    default:
      return <StyledDateTimePicker {...props} />;
  }
}

/**
 * @typedef {("year"|"month"|"day"|"hours"|"minutes")} ViewsType
 */

/**
 * Компонент Datepicker для работы со значениями даты и времени. Также может
 * отобразить TimePicker и DateTimePicker в зависимости от значения параметра
 * type.
 *
 * @param {Object} props объект параметров компонента
 * @param {("date"|"time"|"datetime")} [props.type] определяет тип компонента
 * @param {string} [props.className] дополнительный классы css для кастомизации
 * @param {boolean} [props.disabled] выключен ли компонент
 * @param {boolean} [props.fullWidth] определяет ширину занимаемого
 * пространства инпутом
 * @param {string} [props.inputFormat] определяет формат представления данных
 * @param {string} [props.label] подпись поля
 * @param {boolean} [props.labelShrink] определяет положение подписи для
 * пустого поля
 * @param {string} [props.placeholder] placeholder
 * @param {boolean} [props.readOnly] включен ли режим "только для чтения"
 * @param {("small"|undefined)} props.size определяет размер поля
 * @param {ViewsType[]} [props.views] определяет набор всех видов, которые будут
 * задействованы в процессе выбора значения
 * @returns {JSX.Element} DatePicker, TimePicker или DateTimePicker
 *
 */
export default function DatepickerReactFinalForm({
  type = TYPES.DATE,
  className,
  disabled = false,
  fullWidth = false,
  inputFormat = INPUT_FORMATS[type],
  label = "",
  labelShrink = true,
  placeholder = INPUT_PLACEHOLDER[type],
  readOnly = false,
  size,
  views = VIEWS[type],
  input: { value, onChange, ...input },
  meta: { touched, invalid, error } = {
    touched: false,
    invalid: false,
    error: "",
  },
  ...custom
}) {
  return (
    <ThemeProvider theme={ruRU}>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="ru">
        {renderDatepicker({
          type,
          componentsProps: {
            actionBar: {
              actions: ["clear", "today"],
            },
          },
          disabled,
          inputFormat,
          label,
          PopperProps: {
            placement: "bottom-start",
          },
          readOnly,
          value: value ? value : null,
          views,
          onChange: onChange,
          renderInput: (params) => (
            <Input
              {...params}
              {...input}
              {...custom}
              size={size}
              error={touched && invalid}
              helperText={touched && error}
              InputLabelProps={{
                shrink: labelShrink,
              }}
              inputProps={{
                ...params.inputProps,
                placeholder: placeholder,
              }}
              fullWidth={fullWidth}
              sx={{
                marginBottom: "25px",
                ...custom.sx,
              }}
            />
          ),
          dayOfWeekFormatter: (day) =>
            `${day.charAt(0).toUpperCase()}${day[1]}`,
        })}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
