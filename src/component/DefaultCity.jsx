import { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";

const DefaultCity = (cordinates) => {
  const [weatherData, setWeatherData] = useState([""]);
  const [isLoading, setIsLoading] = useState(true);

  const citySearch = "https://api.openweathermap.org/data/2.5/weather?lat=";
  const apiConst = "&appid=e472626f1137bd61d04038f1c7c3f4e8";

  const dispatch = useDispatch();

  useEffect(() => {
    const cityData = async (e) => {
      try {
        const response = await fetch(citySearch + cordinates.lan + "&lon=" + cordinates.lon + apiConst);
        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
          setIsLoading(false);
        } else {
          alert("Error");
        }
      } catch (error) {
        console.log(error);
      }
    };

    cityData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Col xs={3}>
        <Card
          onClick={() => {
            dispatch({ type: "SELECT", payload: weatherData });
          }}
        >
          <Card.Img />
          <Card.Body>
            <Card.Title>
              {weatherData.name} - {weatherData.sys.country}
            </Card.Title>
            <Card.Text className="display-5">{(weatherData.main.temp - 273.15).toFixed(1)}°C</Card.Text>
            <Card.Subtitle>Click for more info</Card.Subtitle>
          </Card.Body>
        </Card>
      </Col>
    );
  }
};

export default DefaultCity;
