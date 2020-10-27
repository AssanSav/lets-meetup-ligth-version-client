import React from "react";
import {  useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "../store/usersReducer";

const MyProfile = ({history}) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.user)
  const interests = useSelector(state => state.users.interests)
  const {
    id,
    age,
    image,
    username,
    city,
    gender,
    orientation,
    ethnicity,
    height,
    body_shape,
    children,
    relationship,
    education,
    bio,
  } = user


  const removeUser = async () => {
    await dispatch(deleteUser(user))
      history.push("/signup");
  };

  const anchorTag = (
    <Link style={{ color: "red" }} to={`/edit-profile/${id}`}>
      Add
    </Link>
  );

  return (
    <div className="user-profile" style={{ backgroundColor: "gray" }}>
      <div className="avatar_flip">
        <img className="profile_pic" src={image} alt="" />
      </div>
      <h2>
        <strong>{username}</strong>
      </h2>
      <Link to={`/upload-photos/${id}`}>
        <strong style={{ color: "blue" }}>Add Profile Picture</strong>
      </Link>
      <h2>Bio</h2>
      <p className="bio">{bio}</p>
      <table
        className="table"
        style={{ color: "black", backgroundColor: "white" }}
      >
        <tbody>
          <tr>
            <td>
              <strong>GENDER:</strong> {gender}{" "}
            </td>
            <td>
              <strong>ORIENTATION:</strong> {orientation}
            </td>
          </tr>

          <tr>
            <td>
              <strong>CITY:</strong> {!city ? anchorTag : city}
            </td>
            <td>
              <strong>AGE:</strong> {!age ? anchorTag : age}{" "}
            </td>
          </tr>

          <tr>
            <td>
              <strong>RELATIONSHIP:</strong>{" "}
              {!relationship ? anchorTag : relationship}
            </td>
            <td>
              <strong>KIDS:</strong> {!children ? anchorTag : children}
            </td>
          </tr>

          <tr>
            <td>
              <strong>HEIGHT:</strong> {!height ? anchorTag : height}
            </td>
            <td>
              <strong>BODY SHAPE:</strong>{" "}
              {!body_shape ? anchorTag : body_shape}
            </td>
          </tr>

          <tr>
            <td>
              <strong>ETHNICITY:</strong> {!ethnicity ? anchorTag : ethnicity}
            </td>
            <td>
              <strong>EDUCATION:</strong> {!education ? anchorTag : education}
            </td>
          </tr>
        </tbody>
      </table>
      <h4>
        <strong>Interested In:</strong>
      </h4>
      <h2>
        {interests.map((int) => (
          <span key={int.id}>{int.name}&nbsp; </span>
        ))}
      </h2>
      <div>
        <Link to={`/edit-profile/${id}`}>
          <button className="btn btn-success">
            Edit Profile
          </button>
        </Link>
      </div>
      <button
        className="btn btn-danger"
        onClick={() => {
          if (window.confirm("Are you sure you wish to delete your account?"))
            removeUser(user);
        }}
        style={{ marginTop: "10px" }}
      >
        Delete
        </button>
    </div>
  );
}
 
export default MyProfile;
