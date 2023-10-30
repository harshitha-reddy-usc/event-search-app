import React, { useState, useEffect } from 'react';

function storeFav() {
  const [data, setData] = useState('');

  useEffect(() => {
    localStorage.setItem('myData', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('myData'));
    if (storedData) {
      setData(storedData);
    }
  }, []);

  return (
    <div>
      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <p>{data}</p>
    </div>
  );
}

export default storeFav;
