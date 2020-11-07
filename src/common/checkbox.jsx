import React from "react";

const Checkbox = ({ name, label, options, error, ...rest }) => {
  return (
    <>
      <label style={{ color: "green", fontWeight: "bold" }}>Interests</label>
      <div className="interests" >
        {options.map((option, index) =>
          <span key={option.id}>
            <label htmlFor={name}>
              <input
                {...rest}
                name={name}
                id={"index_" + index}
                type="checkbox"
                value={option.id}
              />
              {option.name}
            </label>
            {error && <div className="alert alert-danger">{error}</div>}
          </span>
        )}
      </div>
    </>
  );
};

export default Checkbox;