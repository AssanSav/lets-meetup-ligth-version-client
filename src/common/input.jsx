import React from "react";

const Input = ({ name, label, error, ...rest }) =>  (
    <div className="form-group">
      <div className="form-cotrol">
      {error && <div className="alert alert-danger">{error}</div>}
        <input {...rest} name={name} id={name} placeholder={name} className="form-control" />
      </div>
    </div>
  );

export default Input;


// import React from "react";

// const Input = ({ name, label, error, ...rest }) => {
//   return (
//     <>
//       <label htmlFor={name}>{}</label>
//       <input {...rest} name={name} id={name} placeholder={label} />
//       {/* {error && <div>{error}</div>} */}
//     </>
//   );
// };

// export default Input