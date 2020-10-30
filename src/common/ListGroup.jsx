import React, { useState, useRef } from "react";
// import {} from "react-redux"

const ListGroup = ({ genders, OnGenderSelect, selectedGender }) => {
  const [toggleHide, setToggleHide] = useState(false)
  const hideRef = useRef()
  const showRef = useRef()

  const hide = (e) => {
    if(toggleHide) {
      setToggleHide(false)
      showRef.current.innerHTML = "Hide"
    }else{ 
      setToggleHide(true)
      showRef.current.innerHTML = "Show"
    }
  }

  return (
    <>
    { !toggleHide && <ul className="list-group col-5" ref={hideRef} style={{ marginLeft: "130px" }} >
      <h2 style={{ color: "blue" }}>
        <strong>Let's Chat!!!</strong>
      </h2>
      {genders.map((gender) => (
        <li

          style={{ cursor: "pointer" }}
          onClick={() => OnGenderSelect(gender)}
          key={gender}
          className={
            gender === selectedGender
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {gender}
        </li>
      ))}
    </ul>}
        <button ref={showRef} style={{marginLeft: "160px", marginTop:"10px"}} className="btn btn-primary List" onClick={hide}>Hide</button>
    </>
  );
};

export default ListGroup;
