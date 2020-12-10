import React from "react";

const Input = ({ name, label, error, ...rest }) => (
  <div className="form-group">
    <div className="">
      {error && <div className="alert alert-danger" >{error}</div>}
      <input {...rest} name={name} id={name} placeholder={name} className="form-control" />
    </div>
  </div>
);

export default Input;
