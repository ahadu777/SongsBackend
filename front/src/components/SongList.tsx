import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongsRequest, deleteSongRequest, updateSongRequest, updateSongSuccess, addSongRequest } from '../slices/songSlice';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e2e2;
  border-radius: 12px;
  padding: 5px;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Button = styled.button`
  background-color: #007bff; /* Primary color */
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  margin: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3; /* Darker shade on hover */
  }

  &:disabled {
    background-color: #ccc; /* Disabled state */
    cursor: not-allowed;
  }
`;

const DeleteButton=styled.button`
 background: red; 
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  margin: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3; 
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #e2e2e2;
  border-radius: 8px;

  @media (max-width: 600px) {
    padding: 8px;
  }
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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentSong) {
      await dispatch(updateSongRequest({
        id: currentSong._id,
        song: formData
      }));
      dispatch(updateSongSuccess({ ...currentSong, ...formData }));

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
      <Button onClick={() => setIsAdding(true)}>Add Song</Button>
      <Row>
        {songList.length > 0 ? (
          songList.map((song: any) => (
            <Card key={song._id}>
              <h2>{song.title}</h2>
              <p>Album: {song.album}</p>
              <p>Artist: {song.artist}</p>
              <p>Genre: {song.genre}</p>
             
              <Button onClick={() => handleEdit(song)}>Edit</Button>

              <DeleteButton onClick={() => handleDelete(song._id)}>Delete</DeleteButton>
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
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Title"
                required
              />
              <Input
                type="text"
                value={formData.album}
                onChange={(e) => setFormData({ ...formData, album: e.target.value })}
                placeholder="Album"
                required
              />
              <Input
                type="text"
                value={formData.artist}
                onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                placeholder="Artist"
                required
              />
              <Input
                type="text"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                placeholder="Genre"
                required
              />
              <Button type="submit">Update Song</Button>
              <Button type="button" onClick={() => setIsEditing(false)}>Cancel</Button>
            </form>
          </ModalContent>
        </Modal>
      )}

      {isAdding && (
        <Modal>
          <ModalContent>
            <h2>Add Song</h2>
            <form onSubmit={handleAdd}>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Title"
                required
              />
              <Input
                type="text"
                value={formData.album}
                onChange={(e) => setFormData({ ...formData, album: e.target.value })}
                placeholder="Album"
                required
              />
              <Input
                type="text"
                value={formData.artist}
                onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                placeholder="Artist"
                required
              />
              <Input
                type="text"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                placeholder="Genre"
                required
              />
              <Button type="submit">Add Song</Button>
              <Button type="button" onClick={() => setIsAdding(false)}>Cancel</Button>
            </form>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default SongList;
