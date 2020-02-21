import React, { useState } from 'react';
import api from '../../services/api';
import './styles.css';

export default function New({ history }) {
  const [image, setImage] = useState([]);
  const [author, setAuthor] = useState([]);
  const [place, setPlace] = useState([]);
  const [description, setDescription] = useState([]);
  const [hashtags, setHashtags] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();

    data.append('image', image);
    data.append('author', author);
    data.append('place', place);
    data.append('desciption', description);
    data.append('hashtags', hashtags);

    await api.post('/posts', data);
    history.push('/');
  }

  return (
    <form onSubmit={handleSubmit} id="new-post">
      <input type="file" onChange={e => setImage(e.target.files[0])} />

      <input
        type="text"
        name="author"
        placeholder="Autor do post"
        onChange={e => setAuthor(e.target.value)}
        value={author}
      />

      <input
        type="text"
        name="place"
        placeholder="Local do post"
        onChange={e => setPlace(e.target.value)}
        value={place}
      />

      <input
        type="text"
        name="description"
        placeholder="Descrição do post"
        onChange={e => setDescription(e.target.value)}
        value={description}
      />

      <input
        type="text"
        name="hashtags"
        placeholder="Hashtags do post"
        onChange={e => setHashtags(e.target.value)}
        value={hashtags}
      />

      <button type="submit">Enviar</button>
    </form>
  );
}
