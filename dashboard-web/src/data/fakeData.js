const getFakeNewsTrends = (keyword, startDate, endDate) => {
    // Gerando dados fictícios
    const dateRange = Array.from(new Array(30), (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    }).reverse();
  
    const data = dateRange.map(date => ({
      date,
      count: Math.floor(Math.random() * 10) // Número aleatório de notícias
    }));
  
    return Promise.resolve(data);
  };
  
  export default getFakeNewsTrends;
  