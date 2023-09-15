import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const Selected = () => {
  const selected = useSelector((state) => state.selected);
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const citySearch = "api.openweathermap.org/data/2.5/forecast?lat=";
  const apiConst = "&appid=e472626f1137bd61d04038f1c7c3f4e8";

  useEffect(() => {
    console.log(selected);
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
      <Row>
        <h2>{weatherData.name}</h2>
      </Row>
    );
  }
};
export default Selected;
