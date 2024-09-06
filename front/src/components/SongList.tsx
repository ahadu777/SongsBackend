import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongsRequest } from '../slices/songSlice';

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
      <ul>
        {songList.length > 0 ? (
          songList.map((song: any) => (
            <li key={song._id}>
              <h2>{song.title}</h2>
              <p>Album: {song.album}</p>
              <p>Artist: {song.artist}</p>
              <p>Genre: {song.genre}</p>
              <p>Created At: {new Date(song.createdAt).toLocaleString()}</p>
              <p>Updated At: {new Date(song.updatedAt).toLocaleString()}</p>
            </li>
          ))
        ) : (
          <p>No songs available.</p>
        )}
      </ul>
    </div>
  );
};

export default SongList;
