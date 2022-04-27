export const reqiredValidation = (
  { value = "", error = false, errorMessage = "" },
  setState
) => {
  if (!value || value.trim().length === 0) {
    setState((i) => ({
      ...i,
      error: true,
      errorMessage: "This field is required",
    }));
    return false;
  } else {
    if (!!error) {
      setState((i) => ({
        ...i,
        error: false,
        errorMessage: "",
      }));
    }
    return true;
  }
};

export const emailValidation = (
  { value = "", error = false, errorMessage = "" },
  setState
) => {
  var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (!value || value.trim().length === 0) {
    setState((i) => ({
      ...i,
      error: true,
      errorMessage: "This field is required",
    }));
    return false;
  } else if (!pattern.test(value)) {
    setState((i) => ({
      ...i,
      error: true,
      errorMessage: "Invalid email",
    }));
    return false;
  } else {
    if (!!error) {
      setState((i) => ({
        ...i,
        error: false,
        errorMessage: "",
      }));
    }
    return true;
  }
};

const checkValidations = (array) =>
  !([...array].some((bool) => bool === false) || false);

export default checkValidations;
