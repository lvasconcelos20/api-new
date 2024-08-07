"use client";

import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { getNewsByQuery } from '../lib/api';
import 'chart.js/auto';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    border-color: #66afe9;
    outline: none;
    box-shadow: 0 0 8px rgba(102, 175, 233, 0.6);
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const Dashboard = () => {
  const [keyword, setKeyword] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [source, setSource] = useState('');
  const [lineChartData, setLineChartData] = useState({});
  const [barChartData, setBarChartData] = useState({});

  const fetchNewsData = async () => {
    const data = await getNewsByQuery(keyword, fromDate, toDate, source);
    
    if (data.articles) {
      const dates = data.articles.map(article => article.publishedAt.split('T')[0]);
      const uniqueDates = [...new Set(dates)];
      const articlesCount = uniqueDates.map(date => dates.filter(d => d === date).length);

      setLineChartData({
        labels: uniqueDates,
        datasets: [{
          label: 'Número de notícias',
          data: articlesCount,
          borderColor: 'rgba(75,192,192,1)',
          fill: false,
        }]
      });

      const sourcesCount = data.articles.reduce((acc, article) => {
        acc[article.source.name] = (acc[article.source.name] || 0) + 1;
        return acc;
      }, {});
      const sourceLabels = Object.keys(sourcesCount);
      const sourceValues = Object.values(sourcesCount);

      setBarChartData({
        labels: sourceLabels,
        datasets: [{
          label: 'Notícias por fonte',
          data: sourceValues,
          backgroundColor: 'rgba(75,192,192,0.4)',
        }]
      });
    }
  };

  return (
    <Container>
      <InputContainer>
        <Input type="text" placeholder="Palavra-chave" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        <Input type="text" placeholder="Fonte" value={source} onChange={(e) => setSource(e.target.value)} />
        <Button onClick={fetchNewsData}>Buscar</Button>
      </InputContainer>
      <div>
        {lineChartData.labels ? <Line data={lineChartData} /> : <p>No data available</p>}
      </div>
      <div>
        {barChartData.labels ? <Bar data={barChartData} /> : <p>No data available</p>}
      </div>
    </Container>
  );
};

export default Dashboard;
