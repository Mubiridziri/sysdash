import * as React from "react";

import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Input from "components/FormFields/Input";
import { styled } from "@mui/styles";
import { Box } from "@mui/material";

const INITIAL_SEARCH_VALUE = "";

const AsyncSelect = ({
  label,
  input,
  meta: { touched, invalid, error },
  readOnly,
  loadOptions,
  required,
  multiple,
  ...custom
}) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const [inputValue, setInputValue] = React.useState(INITIAL_SEARCH_VALUE);

  const fetchOptions = async () => {
    let params = { page: 1, limit: limit };

    if (inputValue !== INITIAL_SEARCH_VALUE) {
      params["where[name]"] = inputValue;
    }

    try {
      setLoading(true);
      const response = await loadOptions(params);
      if (response.error) throw response;

      setOptions(response.entries);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!readOnly && open) {
      fetchOptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  React.useEffect(() => {
    if (!readOnly && open) {
      const getOptions = setTimeout(() => fetchOptions(), 1000);

      return () => clearTimeout(getOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const onOpen = () => {
    if (!readOnly) {
      setOpen(true);
      if (!options.length) {
        fetchOptions();
      }
    }
  };

  const onClose = () => {
    setOpen(false);
    if (inputValue) {
      fetchOptions("reset");
    }
    setInputValue("");
    input.onBlur();
  };

  const onChange = (event, newValue, reason) => {
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

  const onInputChange = (event, newInputValue, reason) => {
    switch (reason) {
      case "input":
        setInputValue(newInputValue);
        break;
      case "reset":
        setInputValue("");
        break;
      default:
        break;
    }
  };

  const onScroll = (event) => {
    const listboxNode = event.currentTarget;
    const totalHeight = Math.ceil(
      listboxNode.scrollTop + listboxNode.clientHeight
    );
    if (totalHeight === listboxNode.scrollHeight) {
      setLimit(limit + 10);
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

  const renderInput = (params) => (
    <Input
      {...params}
      label={label}
      error={touched && invalid}
      helperText={touched && error}
      required={required}
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <React.Fragment>
            {loading ? <CircularProgress size={20} /> : null}
            {!readOnly ? params.InputProps.endAdornment : null}
          </React.Fragment>
        ),
        ...custom.InputProps,
      }}
      InputLabelProps={{ shrink: true }}
      sx={{ ...custom.sx }}
    />
  );

  const renderOption = (props, option) => {
    return (
      <Box component="li" {...props} key={option.id}>
        {renderOptionLabel(option)}
      </Box>
    );
  };

  const renderOptionLabel = (option) => {
    if (option.displayName) {
      return option.displayName;
    }
    if (option.fullName) {
      return option.fullName;
    }
    if (option.name) {
      return option.name;
    }
    return option;
  };

  const renderOptionDisabled = (option) => {
    if (multiple) {
      if (Array.isArray(input.value)) {
        return input.value.some((item) => item.id === option.id);
      }
      return false;
    }
    return option.id === input.value.id;
  };

  return (
    <>
      <StyledSelect
        multiple={multiple}
        value={getValue()}
        id={input.name}
        onOpen={onOpen}
        onClose={onClose}
        onChange={onChange}
        onInputChange={onInputChange}
        ListboxProps={{
          role: "searchbox",
          onScroll: onScroll,
        }}
        getOptionDisabled={renderOptionDisabled}
        getOptionLabel={renderOptionLabel}
        options={options}
        loading={loading}
        readOnly={readOnly}
        disableClearable={readOnly}
        limitTags={5}
        loadingText="Загрузка..."
        noOptionsText="Нет совпадений"
        clearText="Очистить"
        renderInput={renderInput}
        renderOption={renderOption}
        disablePortal
        blurOnSelect
        {...custom}
      />
    </>
  );
};

function styles() {
  return {
    fontFamily: "'TornadoC', sans-serif",
    marginBottom: "25px",
    "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
      paddingTop: "9px",
      paddingBottom: "9px",
      paddingLeft: "10px",
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

export default AsyncSelect;
