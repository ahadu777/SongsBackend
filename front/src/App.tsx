import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSongsRequest } from './slices/songSlice';
import SongList from './components/SongList';
import Dashboard from './components/Dashboard';
import SongForm from './components/SongForm';
import { Routes, Route } from 'react-router-dom';


const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, [dispatch]);

  return (
    <div>
       <Routes>
       <Route path="/" element={<SongList />} />

            <Route path="/addsong" element={<SongForm />} />
         </Routes>

      {/* <h1>Song CRUD App</h1> */}
      {/* <SongForm onClose={() => {}} /> */}
      {/* <SongList /> */}
      {/* <Dashboard /> */}
    </div>
  );
};

export default App;
