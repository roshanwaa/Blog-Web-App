import React, { useState } from 'react';
import classes from '../assets/CSS/createPost.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];
export const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="main_container">
      <form action="">
        <input
          type="title"
          name="title"
          id="postTitle"
          placeholder="Title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          className={`${classes.styledInput} ${classes.wide}`}
          required
        />
        <input
          type="summary"
          name="summary"
          id="postSummary"
          placeholder="Summary"
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
          className={`${classes.styledInput} ${classes.wide}`}
        />
        <div className={`${classes.file}`}>
          <input type="file" className={classes.input_file} />
          <label
            tabIndex="0"
            htmlFor="my_File"
            className={classes.input_file_trigger}>
            Select a file...
          </label>
        </div>

        <ReactQuill
          theme="snow"
          className="reactQuill"
          modules={modules}
          formats={formats}
          value={content}
          onChange={(newValue) => setContent(newValue)}
        />
        <button className={`${classes.custom_btn} ${classes.btn16} `}>
          Read More
        </button>
      </form>
    </div>
  );
};
