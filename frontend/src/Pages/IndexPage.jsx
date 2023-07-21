import React, { useState, useEffect } from 'react';
import { BlogPost } from './BlogPost';

export const IndexPage = () => {
  const [blogPost, setBlogPost] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/post').then((response) => {
      response.json().then((posts) => {
        setBlogPost(posts);
      });
    });
    return () => {};
  }, []);

  return (
    <div className="main_container">
      {blogPost.length > 0 &&
        blogPost.map((post) => {
          return <BlogPost {...post} />;
        })}
    </div>
  );
};
