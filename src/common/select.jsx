import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <>
      <div className="form-group">
        <select name={name} id={name} {...rest} className="form-control">
          <option value="" defaultValue hidden>{label}</option>
          {options.map((option, index) => (
            <option key={index} value={option} >
              {option}
            </option>
          ))}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </>
  );
};

export default Select;
