import React from "react";

const Checkbox = ({ name, label, options, error, ...rest }) => {
  return (
    <>
      <label>Interests</label>
    <div className="interests" style={{marginBottom: "10px"}}>
      {options.map((option, index) =>
        <span key={option.id}>
          <label htmlFor={name}></label>
          <input
            {...rest}
            name={name}
            id={"index_" + index}
            type="checkbox"
            value={option.id}
          />
          {option.name}
          {error && <div className="alert alert-danger">{error}</div>}
        </span>
      )}
    </div>
    </>
  );
};

export default Checkbox;