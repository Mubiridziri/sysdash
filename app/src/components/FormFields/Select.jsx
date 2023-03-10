import React from "react";
import {
  Autocomplete,
  Checkbox,
  InputAdornment,
  ListItemText,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/styles";
import Input from "components/FormFields/Input";

function renderInput(
  params,
  name,
  placeholder,
  label,
  custom,
  icon,
  meta,
  required,
  fullWidth
) {
  const { touched, invalid, error } = meta;
  params.InputProps.startAdornment = (
    <div className={"start-content"}>
      {icon && <InputAdornment position="start">{icon}</InputAdornment>}
      <span>{params.InputProps.startAdornment}</span>
    </div>
  );
  return (
    <Input
      {...params}
      sx={{ width: !fullWidth ? 200 : "100%" }}
      label={label}
      placeholder={placeholder}
      name={name}
      error={touched && invalid}
      helperText={touched && error}
      required={required}
      InputProps={{
        ...params.InputProps,
        ...custom.InputProps,
      }}
      inputProps={{
        ...params.inputProps,
        autoComplete: "off",
      }}
    />
  );
}

function Select({
  multiple,
  options,
  placeholder,
  label,
  fullWidth,
  size,
  input,
  icon,
  required,
  meta,
  ...custom
}) {
  const handleChange = (e, newValue, reason) => {
    switch (reason) {
      case "selectOption":
        input.onChange(newValue);
        break;
      case "removeOption":
        if (newValue.length) {
          input.onChange(newValue);
        } else {
          input.onChange("");
        }
        break;
      case "clear":
        input.onChange("");
        break;
      default:
        break;
    }
  };

  const getValue = () => {
    if (multiple) {
      if (Array.isArray(input.value)) {
        return input.value;
      }
      return [];
    }
    return input.value || null;
  };

  const renderTags = React.useCallback(() => {
    if (multiple) return (options) => options.map((el) => el.label).join("; ");
  }, [multiple]);

  const isValueEmpty = React.useMemo(
    () =>
      (Array.isArray(input.value) && input.value.length === 0) ||
      input.value?.id === "",
    [input.value]
  );
  return (
    <StyledSelect
      disablePortal
      disableClearable={isValueEmpty}
      size={size}
      id={input.name}
      autoComplete={false}
      noOptionsText={"Ничего не найдено"}
      clearText={"Очистить"}
      options={options}
      multiple={multiple}
      onChange={handleChange}
      value={getValue()}
      renderTags={renderTags()}
      selectOnFocus
      renderOption={(props, option, { selected }) => (
        <MenuItem key={option.id} value={option.id} {...props}>
          {multiple && <Checkbox checked={selected} />}
          <ListItemText primary={option.label} />
        </MenuItem>
      )}
      renderInput={(params) =>
        renderInput(
          params,
          input.name,
          placeholder,
          label,
          custom,
          icon,
          meta,
          required,
          fullWidth
        )
      }
      {...custom}
    />
  );
}

function styles() {
  return {
    fontFamily: "'TornadoC', sans-serif",
    marginBottom: "25px",
    "& .start-content": {
      display: "flex",
      alignItems: "center",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
    "& .MuiTextField-root.MuiFormControl-root": {
      margin: 0,
    },
    "& .MuiInputBase-root": {
      minHeight: "55px",
    },
    "& .MuiInputBase-adornedEnd": {
      "&.MuiInputBase-sizeSmall": {
        fontSize: "13px",
        minHeight: "40px",
      },
    },
    "& .MuiInputAdornment-root": {
      margin: `0 5px`,
      height: "unset",
    },
  };
}

const StyledSelect = styled(Autocomplete)(styles);

Select.defaultProps = {
  multiple: false,
  placeholder: "",
  options: [],
  fullWidth: false,
  size: "medium",
  required: false,
  label: "",
  meta: {
    touched: false,
    invalid: false,
    error: "",
  },
};

export default Select;
