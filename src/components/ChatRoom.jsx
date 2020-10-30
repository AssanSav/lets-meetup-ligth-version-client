import React, { createRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import ChatRoomForm from "../common/ChatRoomForm";
import { createMessage } from '../store/messagesReducer';


const ChatRoom = (props) => {
  const [content, setContent] = useState("")
  const [match_id, setMatchId] = useState("")
  const messages = useSelector(state => state.messages.all)
  const user = useSelector(state => state.users.user)
  let messagesEnd = createRef(null)
  const dispatch = useDispatch()
  const id = props.match.params.id
  const userId = user.id

  const scrollToBottom = () => {
    return messagesEnd.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  useEffect(() => {
    scrollToBottom()
  }, [scrollToBottom])

  const handleChange = (e) => {
    setContent(e.target.value)
    setMatchId(props.match.params.id)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createMessage({ content: content, match_id: match_id }))
    setContent("")
  }

  const received_messages = messages.filter((message) => {
    return message.user_id
      ? message.user_id === parseInt(id) &&
      message.match_id === parseInt(userId)
      : message;
  });

  const sent_messages = messages.filter((message) =>
    message.user_id
      ? message.user_id === parseInt(userId) &&
      message.match_id === parseInt(id)
      : message
  );

  const allMessages = received_messages
    .concat(sent_messages)
    .sort((a, b) => (a.created_at > b.created_at ? 1 : -1));

  const matchName = !allMessages || allMessages.length !== 0 ? allMessages.find(message => message).match_name : ""

  return (
    <>
      <div className="chatroom">
        <div style={{ color: "red" }}></div>
        <h3>Chat Room With {matchName}</h3>
        <div className="chats" >
          <div >
            {allMessages.map((message) => (
              <span
                key={message.id}
                className={`chat ${user.id === message.match_id
                  ? "right"
                  : "left"
                  }`}
              >
                {user.id !== message.user_id && (
                  <img
                    src={message.image}
                    alt={`${message.username}'s profile pic`}
                  />
                )}
                {message.content}
              </span>
            ))}
          </div>
          <div style={{ float: "left", clear: "both", marginBottom: "0px" }}
            ref={(el) => { messagesEnd = el; }}>
          </div>
        </div>
        <ChatRoomForm handleChange={handleChange} handleSubmit={handleSubmit} content={content} scrollToBottom={scrollToBottom} />
      </div>
      <Link to={`/users`}>
        <Button variant="danger">back</Button>
      </Link>
    </>
  );
}

export default ChatRoom;

