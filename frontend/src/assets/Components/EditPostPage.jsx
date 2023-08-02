import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import classes from '../CSS/createPost.module.css';
import { MDBFile } from 'mdb-react-ui-kit';
import { Editor } from './Editor';

export const EditPostPage = () => {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/post/' + id).then(async (response) => {
      const responseData = await response.json();
      setTitle(responseData.title);
      setSummary(responseData.summary);
      setContent(responseData.content);
      setFiles(responseData.files);
    });

    return () => {};
  }, []);

  const UpdatePost = async (ev) => {
    ev.preventDefault();

    const data = new FormData(ev.currentTarget);
    data.append('title', title);
    data.append('summary', summary);
    data.append('content', content);
    data.set('id', id);

    if (files?.[0]) {
      data.append('file', files?.[0]);
    }

    const response = await fetch('http://localhost:4000/post', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={'/post/' + id} />;
  }

  return (
    <div className="main_container">
      <form action="" onSubmit={UpdatePost}>
        <input
          type="name"
          name="name"
          id="postTitle"
          placeholder="Title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          className={`${classes.styledInput} ${classes.wide}`}
          required
        />
        <input
          type="name"
          name="name"
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

        <Editor onChange={setContent} value={content} />
        <button className={`${classes.custom_btn} ${classes.btn16}`}>
          Update Post
        </button>
      </form>
    </div>
  );
};
