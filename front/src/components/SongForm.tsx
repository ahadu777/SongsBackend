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
    
    setIsSubmitting(false); 
  };

  return (
    <>
   
    <SongList></SongList>
    </>
  );
};

export default AddSong;
