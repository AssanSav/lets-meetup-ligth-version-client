import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile } from "../store/usersReducer";

const Profile = (props) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.users.status);
  const interests = useSelector((state) => state.users.interests);

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
  } = useSelector((state) => state.users.profile);

  useEffect(() => {
    dispatch(fetchProfile(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  if (!status) {
    return <div></div>;
  } else {
    return (
      <div className="user-profile" style={{ backgroundColor: "gray" }}>
        <div className="avatar_flip">
          <img className="profile_pic" src={image} alt="" />
        </div>
        <h2>
          <strong>{username}</strong>
        </h2>
        <h2>Bio</h2>
        <p className="bio">{bio}</p>
        <table
          className="table"
          style={{ color: "black", backgroundColor: "white" }}
        >
          <tbody>
            <tr>
              <td>
                <strong>City:</strong> {city}
              </td>
              <td>
                <strong>Age:</strong> {age}{" "}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Gender:</strong> {gender}{" "}
              </td>
              <td>
                <strong>Orientation:</strong> {orientation}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Relationship:</strong> {relationship}
              </td>
              <td>
                <strong>Children:</strong> {children}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Height:</strong> {height}
              </td>
              <td>
                <strong>Body Shape:</strong> {body_shape}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Ethnicity:</strong> {ethnicity}
              </td>
              <td>
                <strong>Education:</strong> {education}
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
        <Link to={`/new-message/${id}`}>
          <button className="btn btn-success">Send Message</button>
        </Link>
      </div>
    );
  }
};

export default Profile;
