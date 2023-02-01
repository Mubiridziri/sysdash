import Datepicker from "./Datepicker";
import { reduxForm } from "redux-form";
import "moment/locale/ru";

import DatepickerField from "components/FormFields/Datepicker/DatepickerField";

export default {
  title: "FormFields/Datepicker",
  component: Datepicker,
  argTypes: {
    label: {
      type: "string",
      description: "Подпись поля",
      control: { type: "text" },
    },
  },
};

let Form = ({ handleSubmit, submit, props }) => {
  return (
    <form onSubmit={handleSubmit(submit)}>
      <DatepickerField name="datepicker" label="Datetime" props={props} />
    </form>
  );
};

Form = reduxForm({
  form: "storybook-datepicker-form",
  onSubmit: () => {},
})(Form);

const Template = (args) => <Form {...args} />;

export const Default = Template.bind({});
Default.args = {
  props: {},
};

export const Error = Template.bind({});
Error.args = {
  props: { meta: { touched: true, invalid: true, error: "Error" } },
};

export const Small = Template.bind({});
Small.args = {
  props: { size: "small" },
};

export const Time = Template.bind({});
Time.args = {
  props: {
    type: "time",
  },
};

export const DateTime = Template.bind({});
DateTime.args = {
  props: {
    type: "datetime",
  },
};

export const DisabledDate = Template.bind({});
DisabledDate.args = {
  props: {
    type: "date",
    disabled: true,
  },
};

export const DisabledTime = Template.bind({});
DisabledTime.args = {
  props: {
    type: "time",
    disabled: true,
  },
};

export const DisabledDateTime = Template.bind({});
DisabledDateTime.args = {
  props: {
    type: "datetime",
    disabled: true,
  },
};

export const ReadOnlyDate = Template.bind({});
ReadOnlyDate.args = {
  props: {
    type: "date",
    readOnly: true,
  },
};

export const ReadOnlyTime = Template.bind({});
ReadOnlyTime.args = {
  props: {
    type: "time",
    readOnly: true,
  },
};

export const ReadOnlyDateTime = Template.bind({});
ReadOnlyDateTime.args = {
  props: {
    type: "datetime",
    readOnly: true,
  },
};
