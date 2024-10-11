import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3030/api'); // Altere para a URL da sua API
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Olá, Front-end!</h1>
      {data ? <h2>{data.message}</h2> : <p>Carregando...</p>}
    </div>
  );
  
};

export default App;
