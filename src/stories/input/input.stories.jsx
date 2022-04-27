import Input from "./input";

export default {
  title: "Input",
  component: Input,
};

const handleOnChange = (event) => {
  console.log("1->event", event);
};

// export const Input = () => <Input onChange={handleOnChange} />;

const Template = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  error: !true,
  placeholder : 'Enter the value',
  label : 'Username'
};

export const WithError = Template.bind({});
WithError.args = {
  error: true,
  errorMessage: "This field is required",
  placeholder : 'Enter the value',
  label : 'Username'
};
