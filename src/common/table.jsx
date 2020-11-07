import React from 'react';
import { Link } from "react-router-dom";


export const messagesTable = (data, deleteMessage, label) => {

  return (
    <table>
      <tbody>
        <tr>
          <th>Date:</th>
          <th>From:</th>
          <th>Content:</th>
          <th>Reply:</th>
          <th>Remove:</th>
        </tr>
        {data.map((message) => (
          <tr key={message.id}>
            <td>
              {message.created_at.split("T")[0]} at{" "}
              {message.created_at.split("T")[1].split(".")[0]}
            </td>
            <td id="link">
              <Link to={`/match-profile/${message.user_id}`}>
                {message.sender_name}
              </Link>
            </td>
            <td id="link">{message.content}</td>
            <td id="link">
              <Link to={`/new-message/${message.user_id}`}>
                <button className="btn btn-success">{label}</button>
              </Link>
            </td>
            <td id="last_link">
              <button
                className="btn btn-danger"
                onClick={() => deleteMessage(message)}
              >
                X
                    </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
