import { useEffect, useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const Selected = () => {
  const selected = useSelector((state) => state.selected);
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const citySearch = "https://api.openweathermap.org/data/2.5/forecast?lat=";
  const apiConst = "&appid=e472626f1137bd61d04038f1c7c3f4e8";

  useEffect(() => {
    const cityData = async (e) => {
      try {
        const response = await fetch(citySearch + selected.coord.lat + "&lon=" + selected.coord.lon + apiConst);
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
  }, [selected]);

  if (isLoading) {
    return <div>Nothing here Yet</div>;
  } else {
    return (
      <Row className="text-center">
        <h2>{weatherData.city.name}</h2>
        <h4>
          Today: {day}/{month}
        </h4>
        <h1>{(selected.main.temp - 273.15).toFixed(1)}°C</h1>
        <h6>but it feels like {(selected.main.feels_like - 273.15).toFixed(1)}°C</h6>
        <Row>
          <Col>Weather: {selected.weather[0].main}</Col>
          <Col>Temp-min: {(selected.main.temp_min - 273.15).toFixed(1)}°C</Col>
          <Col>Temp-max: {(selected.main.temp_max - 273.15).toFixed(1)}°C</Col>
        </Row>
        <Row>Future Forcast</Row>
        <Row>
          <ListGroup>
            {weatherData.list.map((data) => {
              let dateList = new Date(data.dt);
              let monthList = dateList.getMonth() + 1;
              let dayList = dateList.getDate();

              return (
                <ListGroup.Item key={dateList}>
                  <Col>
                    {dayList}/{monthList}
                  </Col>
                  <Col></Col>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Row>
      </Row>
    );
  }
};
export default Selected;
