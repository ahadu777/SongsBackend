import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const DashboardContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 200px;
  text-align: center;

  @media (max-width: 600px) {
    width: 100%;
    max-width: 300px;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px 0;
`;

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('https://songsbackend-dwx6.onrender.com/stats');
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <div>Loading...</div>;

  const genreData = stats.songsByGenre.map((genre: any) => ({
    name: genre._id,
    value: genre.count,
  }));

  return (
    <DashboardContainer>
      <CardContainer>
        <Card>
          <h4>Total Songs</h4>
          <p>{stats.totalSongs}</p>
        </Card>
        <Card>
          <h4>Total Artists</h4>
          <p>{stats.totalArtists}</p>
        </Card>
        <Card>
          <h4>Average Songs/Artist</h4>
          <p>{stats.averageSongsPerArtist.toFixed(2)}</p>
        </Card>
        <Card>
          <h4>Top Genre</h4>
          <p>{stats.topGenre ? `${stats.topGenre.genre} (${stats.topGenre.count})` : 'N/A'}</p>
        </Card>
      </CardContainer>

      <ChartContainer>
        <h2>Genre Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={genreData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>

      <ChartContainer>
        <h2>Songs by Genre</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.songsByGenre}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
