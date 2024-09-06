import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard: React.FC = () => {
  const { songs } = useSelector((state: any) => state.songs);

  const totalSongs = songs;

  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
};

export default Dashboard;
