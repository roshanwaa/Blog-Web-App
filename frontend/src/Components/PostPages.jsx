import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from '../assets/CSS/PostPage.module.css';
import { format, formatISO9075 } from 'date-fns';
export const PostPages = () => {
  const [postInfo, setPostInfo] = useState(null);
  const pageID = useParams().id;

  useEffect(() => {
    fetch(`http://localhost:4000/post/${pageID}`).then((response) => {
      response.json().then((postsInfo) => {
        setPostInfo(postsInfo);
      });
    });
    return () => {};
  }, []);

  if (!postInfo) return '';

  return (
    <div className="main_container">
      <h1 className={classes.postHeading}>{postInfo.title}</h1>
      <div className={classes.postUserInfo}>
        <h4>by {postInfo.author.userName}</h4>
        <br />
        <time className="">
          {format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}
        </time>
      </div>
      <div className={classes.postImage}>
        <img src={`http://localhost:4000/${postInfo.cover}`} alt="post Image" />
      </div>
      <div
        className={classes.postContent}
        dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>{' '}
      <hr />
    </div>
  );
};
