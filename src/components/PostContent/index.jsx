import P from 'prop-types';
import './styles.css';
import { React } from 'react';

export const PostContent = ({ title, cover, body }) => (
  <div className="post-content">
    <img src={cover} alt={title} />
    <div className="post-card">
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  </div>
);

PostContent.propTypes = {
  title: P.string.isRequired,
  cover: P.string.isRequired,
  body: P.string.isRequired,
  id: P.string.isRequired,
};
