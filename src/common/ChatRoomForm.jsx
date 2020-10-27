import React from "react";

const ChatRoomForm = ({ handleSubmit, handleChange, content}) => {
  return (
      <form className="input" onSubmit={handleSubmit}>
        <textarea
          name="content"
          value={content}
          type="text"
          onChange={handleChange}
        ></textarea>
        <input type="submit" disabled={!content} value="Send" />
      </form>
  );
};

export default ChatRoomForm;
