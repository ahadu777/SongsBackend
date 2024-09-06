// src/components/SongForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSong } from '../slices/songSlice';

interface SongFormProps {
  currentSong?: { id: number; title: string; artist: string };
  onClose: () => void;
}

const SongForm: React.FC<SongFormProps> = ({ currentSong, onClose }) => {
  const [title, setTitle] = useState(currentSong ? currentSong.title : '');
  const [artist, setArtist] = useState(currentSong ? currentSong.artist : '');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentSong) {
      // dispatch(updateSong({ id: currentSong.id, title, artist }));
    } else {
      // dispatch(addSong({ id: Date.now(), title, artist }));
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Song Title"
        required
      />
      <input
        type="text"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        placeholder="Artist"
        required
      />
      <button type="submit">{currentSong ? 'Update' : 'Add'} Song</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default SongForm;
