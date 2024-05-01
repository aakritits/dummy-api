import React from "react";

const AddPost = ({ setTitle, title, body, setBody }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
    </div>
  );
};

export default AddPost;
