export const getFieldProps = ({ format, parse, validate }) => {
  let fieldProps = {};
  if (format) {
    fieldProps["format"] = format;
  }
  if (parse) {
    fieldProps["parse"] = parse;
  }
  if (validate) {
    fieldProps["validate"] = validate;
  }
  return fieldProps;
};
