import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);


  const handleDeleteClick = (index) => {
    const updatedHistory = [...history];
    
    updatedHistory.splice(index, 1);
    
    setHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  return (
    <div className="container">
      <div className="top">
        <h1>History</h1>
        <div onClick={() => { navigate('/') }} className="backarrow">
          <i className='bx bx-arrow-back'></i>
        </div>
      </div>
        <div className="historyList">
            <ul>

          {history.map((item, index) => (
            <li key={index}>{item} 
            <button onClick={()=>handleDeleteClick(index)}>Delete</button></li>
          ))}
            </ul>
        </div>
    </div>
  );
}

export default History;
