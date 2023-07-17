import { MDBFile } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import classes from '../assets/CSS/createPost.module.css';

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
  const [files, setFiles] = useState('');

  const createNewPost = async (ev) => {
    const data = new FormData(ev.currentTarget);
    data.append('title', title);
    data.append('summary', summary);
    data.append('content', content);
    data.append('file', files[0]);
    ev.preventDefault();

    const response = await fetch('http://localhost:4000/myPost', {
      method: 'POST',
      body: data,
    });
    // response.json();
    console.log(await response.json());
  };

  return (
    <div className="main_container">
      <form action="" onSubmit={createNewPost}>
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
          <MDBFile
            id="customFile"
            type="file"
            name="file"
            value={files}
            onChange={(ev) => setFiles(ev.target.value)}
          />
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
