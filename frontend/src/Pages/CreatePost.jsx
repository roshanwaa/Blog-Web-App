import React from 'react';
import classes from '../assets/CSS/createPost.module.css';

export const CreatePost = () => {
  return (
    <div className="main_container">
      <form action="">
        <input
          type="title"
          name="title"
          id="postTitle"
          placeholder="Title"
          className={`${classes.styledInput} ${classes.wide}`}
          required
        />
        <input
          type="summary"
          name="summary"
          id="postSummary"
          placeholder="Summary"
          className={`${classes.styledInput} ${classes.wide}`}
        />
        <input type="file" className={`${classes.file}`} />
        <textarea name="Blog" id="blog" cols="30" rows="10"></textarea>
      </form>
    </div>
  );
};
