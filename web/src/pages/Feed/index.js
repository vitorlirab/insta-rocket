import React, { useState, useEffect } from 'react';

import './styles.css';
import more from '../../assets/more.svg';
import like from '../../assets/like.svg';
import comment from '../../assets/comment.svg';
import send from '../../assets/send.svg';
import { loadPost, loadLikes } from '../../services/websocket';
import api from '../../services/api';

export default function Feed() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    async function loadFeed() {
      const response = await api.get('/posts');
      setFeed(response.data);
    }
    loadFeed();
  }, []);
  useEffect(() => {
    loadLikes(
      likedPost => {
        setFeed(
          feed.map(liked => (liked._id === likedPost._id ? likedPost : liked))
        );
      },
      [feed]
    );
  });
  useEffect(() => {
    loadPost(
      newPost => {
        setFeed([newPost, ...feed]);
      },
      [feed]
    );
  });
  function handleLike(id) {
    api.post(`/posts/${id}/like`);
  }
  return (
    <section id="post-list">
      {feed.map(post => (
        <article key={post._id}>
          <header>
            <div className="user-info">
              <span>{post.author}</span>
              <span className="place">{post.place}</span>
            </div>
            <img src={more} alt="Mais" />
          </header>
          <img
            src={`http://localhost:3333/files/${post.image}`}
            alt={post.author}
          />
          <footer>
            <div className="actions">
              <button type="button" onClick={() => handleLike(post._id)}>
                <img src={like} alt="Like" />
              </button>
              <img src={comment} alt="Comment" />
              <img src={send} alt="Send" />
            </div>
            <strong>{post.likes} curtidas</strong>
            <p>
              {post.description}
              <span>{post.hashtags}</span>
            </p>
          </footer>
        </article>
      ))}
    </section>
  );
}
