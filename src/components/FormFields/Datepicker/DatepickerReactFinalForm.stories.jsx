import { Field, Form } from "react-final-form";
import DatepickerReactFinalForm from "./DatepickerReactFinalForm";
import moment from "moment";
import "moment/locale/ru";
import { Button, Stack } from "@mui/material";
import { isValidDate } from "helpers/formValidators";

export default {
  title: "FormFields/DatepickerReactFinalForm",
  component: DatepickerReactFinalForm,
  argTypes: {
    label: {
      type: "string",
      description: "Подпись поля",
      control: { type: "text" },
    },
  },
};

function ExampleForm({props}) {
  return (
    <Form
      initialValues={{
        datepicker: moment("2022-11-10T15:07:24.000Z"),
      }}
      onSubmit={(values) => {
        alert(values["datepicker"]?.toISOString());
      }}
    >
      {({ handleSubmit, valid, pristine }) => (
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} sx={{ width: "300px" }}>
            <Field name="datepicker" validate={isValidDate}>
              {({ input, meta }) => (
                <DatepickerReactFinalForm
                  input={input}
                  meta={meta}
                  sx={{ mb: 0 }}
                  {...props}
                />
              )}
            </Field>

            <Button
              disabled={!valid || pristine}
              variant="contained"
              sx={{ width: "140px" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Stack>
        </form>
      )}
    </Form>
  );
}

const Template = (args) => <ExampleForm {...args} />;
export const Default = Template.bind({});
Default.args = {
  props: {},
};

export const Small = Template.bind({});
Small.args = {
  props: {
    size: "small",
  },
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
