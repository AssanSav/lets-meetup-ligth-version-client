import React from 'react';
import { Link } from "react-router-dom";


export const card = (user) => {

  return (
    <div  className="image-align">
      <Link to={`/profile/${user.id}`}>
        <img src={user.image} alt="" id="avatar_img" />
      </Link>
      <p>
        <strong>
          <Link to={`/profile/${user.id}`}>
            {user.username}
          </Link>
        </strong>
      </p>
      <p>
        <strong>Age:</strong>
        {user.age}
      </p>
      <p>
        <strong>Orientation:</strong>
        {user.orientation}
      </p>
      <Link to={`/profile/${user.id}`}>
        <button className="btn btn-success m-2">View Profile</button>
      </Link>
    </div>
  )
}