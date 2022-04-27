import React from "react";
import PropTypes from "prop-types";
import "./input.scss";

const Input = ({
  placeholder,
  className = "",
  name,
  value,
  onChange,
  type,
  error,
  errorMessage = "",
  label,
  ...rest
}) => {
  return (
    <div className={`input-component ${!!error ? " error" : ""}`}>
      {!!label ? <label>{label}</label> : <></>}
      <input
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        type={type}
        className={`${className}`}
        {...rest}
        value={value}
      />
      {!!error ? (
        <span className="error-message">
          {!!errorMessage ? errorMessage : ""}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
};

Input.defaultProps = {
  onChange: undefined,
  type: "text",
  error: false,
};

export default Input;
