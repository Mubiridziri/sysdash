import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/styles";
import { inputStyles } from "./Input";

/**
 * Позволяет выполнять валидацию на onBlur для полей со сложной валидацией, когда последняя негативно
 * сказывается на производительности формы. Неконтролируемый компонент, устанавливает value как defaultValue, а
 * onChange вешает на onBlur, так что извне менять интерфейс не требуется, он остается полностью идентичен Input.
 */
const UncontrolledInput = ({
  label,
  input: { value, onChange, ...input },
  meta: { touched, invalid, error } = {
    touched: false,
    invalid: false,
    error: "",
  },
  ...custom
}) => (
  <StyledTextField
    label={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    defaultValue={value}
    InputLabelProps={{
      shrink: true,
    }}
    {...custom}
    InputProps={{
      ...custom.InputProps,
    }}
    inputProps={{
      onBlur: onChange
    }}
  />
);

const StyledTextField = styled(TextField)(inputStyles);

export default UncontrolledInput;
