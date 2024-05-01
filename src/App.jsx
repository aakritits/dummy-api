import React, { useEffect, useState } from "react";
import AddPost from "./components/AddPost";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=4"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const addPost = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        userId: Math.random().toString(36).slice(2),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts((prevPosts) => [data, ...prevPosts]);
        // Reset the input fields to empty strings
        setTitle("");
        setBody("");
      });
  };

  const deletePost = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <AddPost
        title={title}
        setTitle={setTitle}
        body={body}
        setBody={setBody}
      />
      <button onClick={addPost}>Add a Post</button>
      {posts.map(({ id, title, body }) => (
        <div key={id}>
          <h3>{title}</h3>
          <p>{body}</p>
          <button onClick={() => deletePost(id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
