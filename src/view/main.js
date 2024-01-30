import { useEffect, useState } from "react";
import "./style.css"
import { useNavigate } from "react-router-dom";

function Main({}) {

  const navigate = useNavigate()
  const [search, setSearch] = useState('karachi')
  const [data, setData] = useState({})
  const [history, setHistory] = useState([])
  const [response, setResponse] = useState(false)

  function getvalue(e) {
    const text = e.target.value
    setSearch(text)
  }



  const fetching = async () => {
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=6e546855056b41f6aed42412230111&q=${search}&aqi=no`);
      if (response.ok) {
        const resData = await response.json();
        setData(resData)
        setResponse(true)
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        setResponse(false)
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };


  const {
    current: {
      condition: { text, icon } = {},
      temp_c,
      wind_kph,
      humidity
    } = {},
    location
  } = data;


  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
    fetching();
  }, []);
  if (!Object.keys(data).length) {
    return <div>loading..</div>;
  }

  const handleSearchClick = () => {
    fetching();
    const newHistory = [...history, search];
    setHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  console.log(history)
  return (
    <>
      <div className="container">
        <div className="head">

          <div id="search-box">
            <i className='bx bx-map'></i>
            <input type="text" placeholder="Enter your location" id="locationInput"
              value={search} onChange={getvalue}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchClick();
                }
              }} />
            <button onClick={handleSearchClick} id="getWeatherButton"><i className='bx bx-search'></i></button>
          </div>
          <div onClick={() => { navigate('./history',) }} className="historyicon"><i className='bx bx-history'></i></div>
        </div>
        {response? <>
        <div className="weather-box">
          <div className="box">
            <div className="info-weather">
              <div className="weather">
                <h1 className="city">{location.name}</h1>
                <p className="country">({location.country})</p>
                <p className="date">{location.localtime}</p>
                <img className="icon" src={icon} alt={location.name} />
                <p className="temperature">{temp_c}<span>℃</span></p>
                <p className="description">{text}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="weather-detail">
          <div className="wind">
            <i className='bx bx-wind'></i>
          </div>
          <div className="text">
            <div className="info-wind">
              <span className="wd">0%</span>
            </div>
            <p>Wind speed</p>
          </div>
          <div className="humidity">
            <i className="bx bx-water"></i>
          </div>
          <div className="text">
            <div className="info-humidity">
              <span className="hd">{wind_kph}kph</span>
            </div>
            <p>Humidity</p>
          </div>
        </div>
        
        </>:<>
            <div className="sorryDiv">
              <h3>Sorry place didn't find!</h3>
            </div>
        </>

}
</div>
    </>
  );
}

export default Main;
