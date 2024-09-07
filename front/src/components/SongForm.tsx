import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSongRequest } from '../slices/songSlice';
import styled from 'styled-components';
import SongList from './SongList';

const Body = styled.div`
  width: 100%;
  padding: 10px;
  margin: 0;
`;

const AddSong = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [album, setAlbum] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSong = { title, album, artist, genre };
    
    // Prevent multiple submissions
    if (isSubmitting) return;

    setIsSubmitting(true); // Set submitting state to true
    console.log(newSong);
    dispatch(addSongRequest(newSong)); // Dispatching addSongRequest with the new song data

    // Reset form fields
    setTitle('');
    setAlbum('');
    setArtist('');
    setGenre('');
    
    // Optionally, you can reset the submitting state after a delay or after the action completes
    setIsSubmitting(false); // Reset after dispatch
  };

  return (
    <>
    <Body>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <input value={album} onChange={(e) => setAlbum(e.target.value)} placeholder="Album" required />
        <input value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artist" required />
        <input value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" required />
        <button type="submit" disabled={isSubmitting}>Add Song</button>
      </form>
    </Body>
    <SongList></SongList>
    </>
  );
};

export default AddSong;
