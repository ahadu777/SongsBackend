import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongsRequest } from '../slices/songSlice';
import styled from 'styled-components';


const Card= styled.div`
 display: flex;
 flex-direction: column;
 border: 1px solid #e2e2e2;
 border-radius: 12px;
 padding: 5px;
 margin:4px;
`;

const SongList: React.FC = () => {
  const dispatch = useDispatch();
  const { songs, loading, error } = useSelector((state: any) => state.songs);

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  console.log('Songs:', songs);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Ensure songs is an array; if it's an object, wrap it in an array
  const songList = Array.isArray(songs) ? songs : songs ? [songs] : [];

  return (
    <div>
      <h1>Songs</h1>
        {songList.length > 0 ? (
          songList.map((song: any) => (
            <Card key={song._id}>
              <h2>{song.title}</h2>
              <p>Album: {song.album}</p>
              <p>Artist: {song.artist}</p>
              <p>Genre: {song.genre}</p>
            </Card>
          ))
        ) : (
          <p>No songs available.</p>
        )}
    </div>
  );
};

export default SongList;
