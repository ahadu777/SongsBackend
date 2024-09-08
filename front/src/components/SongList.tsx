import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongsRequest, deleteSongRequest, updateSongRequest, addSongRequest } from '../slices/songSlice';
import styled from 'styled-components';

const Card = styled.div`
 display: flex;
 flex-direction: column;
 border: 1px solid #e2e2e2;
 border-radius: 12px;
 padding: 8px;
 margin-top: 40px;
 width: 300px;
`;

const Row = styled.div` 
 display: flex;
 flex-direction: row;
 justify-content: center;
 gap: 14px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
`;

const SongList: React.FC = () => {
  const dispatch = useDispatch();
  const { songs, loading, error } = useSelector((state: any) => state.songs);

  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentSong, setCurrentSong] = useState<any>(null);
  const [formData, setFormData] = useState({ title: '', album: '', artist: '', genre: '' });

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteSongRequest(id));
  };

  const handleEdit = (song: any) => {
    setCurrentSong(song);
    setFormData({ title: song.title, album: song.album, artist: song.artist, genre: song.genre });
    setIsEditing(true);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentSong) {
      dispatch(updateSongRequest({
        id: currentSong._id,
        song: formData
      }));
      setIsEditing(false);
      setCurrentSong(null);
      setFormData({ title: '', album: '', artist: '', genre: '' });
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addSongRequest(formData));
    setIsAdding(false);
    setFormData({ title: '', album: '', artist: '', genre: '' });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const songList = Array.isArray(songs) ? songs : songs ? [songs] : [];

  return (
    <div>
      <h1>Songs</h1>
      <button onClick={() => setIsAdding(true)}>Add Song</button>
      <Row>
        {songList.length > 0 ? (
          songList.map((song: any) => (
            <Card key={song._id}>
              <h2>{song.title}</h2>
              <p>Album: {song.album}</p>
              <p>Artist: {song.artist}</p>
              <p>Genre: {song.genre}</p>
              <button onClick={() => handleDelete(song._id)}>Delete</button>
              <button onClick={() => handleEdit(song)}>Edit</button>
            </Card>
          ))
        ) : (
          <p>No songs available.</p>
        )}
      </Row>

      {isEditing && (
        <Modal>
          <ModalContent>
            <h2>Edit Song</h2>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Title"
                required
              />
              <input
                type="text"
                value={formData.album}
                onChange={(e) => setFormData({ ...formData, album: e.target.value })}
                placeholder="Album"
                required
              />
              <input
                type="text"
                value={formData.artist}
                onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                placeholder="Artist"
                required
              />
              <input
                type="text"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                placeholder="Genre"
                required
              />
              <button type="submit">Update Song</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
          </ModalContent>
        </Modal>
      )}

      {isAdding && (
        <Modal>
          <ModalContent>
            <h2>Add Song</h2>
            <form onSubmit={handleAdd}>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Title"
                required
              />
              <input
                type="text"
                value={formData.album}
                onChange={(e) => setFormData({ ...formData, album: e.target.value })}
                placeholder="Album"
                required
              />
              <input
                type="text"
                value={formData.artist}
                onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                placeholder="Artist"
                required
              />
              <input
                type="text"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                placeholder="Genre"
                required
              />
              <button type="submit">Add Song</button>
              <button type="button" onClick={() => setIsAdding(false)}>Cancel</button>
            </form>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default SongList;
