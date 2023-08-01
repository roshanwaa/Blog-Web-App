import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import classes from '../assets/CSS/PostPage.module.css';
export const BlogPost = ({
  _id,
  title,
  summary,
  content,
  cover,
  createdAt,
  author,
}) => {
  return (
    <>
      <div className="post">
        <div className="content_img">
          <Link to={`/post/${_id}`}>
            <img src={'http://localhost:4000/' + cover} alt="" />
          </Link>
        </div>
        <div className="text_Content">
          <Link to={'/post/' + _id}>
            <h1>{title}</h1>
            <h5>{summary}</h5>
          </Link>
          <p className="content_info">
            <a href="" className="content_author">
              @{author.userName}
            </a>
            <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
          </p>

          <div
            className={classes.content_summary}
            dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
      </div>
      <hr />
    </>
  );
};
