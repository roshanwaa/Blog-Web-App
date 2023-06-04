import React, { useState } from 'react';
import classes from '../assets/CSS/createPost.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const CreatePost = () => {
  const [value, setValue] = useState('');
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
        <div className={`${classes.file}`}>
          <input type="file" className={classes.input_file} />
          <label
            tabIndex="0"
            htmlFor="my-file"
            className={classes.input_file_trigger}>
            Select a file...
          </label>
        </div>

        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          className="reactQuill"
        />
      </form>
    </div>
  );
};
