import React from "react";

const Textarea = ({ name, label, error, ...rest }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <div className="form-group">
        <textarea {...rest} name={name} id={name} className="form-control" />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </>
  );
};

export default Textarea;