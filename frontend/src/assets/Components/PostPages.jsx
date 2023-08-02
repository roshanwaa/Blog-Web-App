import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classes from '../CSS/PostPage.module.css';
import { format } from 'date-fns';
import { UserContext } from '../../Pages/UserContext';
import { MdEditDocument } from 'react-icons/md';

export const PostPages = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
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
        <div className={classes.author_Section}>
          <h4>by @{postInfo.author.userName}</h4>
          <Link to={`/edit-post/${postInfo._id}`} className={classes.editDoc}>
            <MdEditDocument />
          </Link>
        </div>

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
        dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
      <hr />
    </div>
  );
};
