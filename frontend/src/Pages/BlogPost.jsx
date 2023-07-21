import React from 'react';
import { format } from 'date-fns';
export const BlogPost = ({
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
          <img src={'http://localhost:4000/' + cover} alt="" />
        </div>
        <div className="text_Content">
          <h1>{title}</h1>
          <h5>{summary}</h5>
          <p className="content_info">
            <a href="" className="content_author">
              {author.userName}
            </a>
            <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
          </p>
          <p className="content_summary">{content}</p>
        </div>
      </div>
    </>
  );
};
