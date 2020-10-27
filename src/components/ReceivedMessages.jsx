import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReceivedMessages } from "../store/messagesReducer";
import { deleteReceivedMessage } from "../store/messagesReducer";
import { messagesTable } from '../common/table';
import { Link } from "react-router-dom";

const ReceivedMessages = () => {
  const dispatch = useDispatch()
  const ReceivedMessages = useSelector(state => state.messages.received)

 

  useEffect(() => {
    dispatch(fetchReceivedMessages())
  }, [dispatch])

  return (
    <>
      <h4 style={{ textAlign: "center", marginTop: "40px", color: "blue" }}>
        INBOX
          </h4>
      <table>
        <tbody>
          <tr>
            <th>Date:</th>
            <th>From:</th>
            <th>Content:</th>
            <th>Reply:</th>
            <th>Remove:</th>
          </tr>
          {ReceivedMessages.map((message) => (
            <tr key={message.id}>
              <td>
                {message.created_at.split("T")[0]} at{" "}
                {message.created_at.split("T")[1].split(".")[0]}
              </td>
              <td id="link">
                <Link to={`/profile/${message.user_id}`}>
                  {message.sender_name}
                </Link>
              </td>
              <td id="link">{message.content}</td>
              <td id="link">
                <Link to={`/new-message/${message.user_id}`}>
                  <button className="btn btn-success">Reply</button>
                </Link>
              </td>
              <td id="last_link">
                <button
                  className="btn btn-danger"
                  onClick={() => dispatch(deleteReceivedMessage(message))}
                >
                  X
                    </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ReceivedMessages
