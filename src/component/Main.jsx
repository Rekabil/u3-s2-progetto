import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import DefaultCity from "./DefaultCity";
import Selected from "./Selected";

const Main = () => {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const citySearch = "http://api.openweathermap.org/geo/1.0/direct?q=";
  const apiConst = "&limit=5&appid=e472626f1137bd61d04038f1c7c3f4e8";

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(citySearch + query + apiConst);
      if (response.ok) {
        const data = await response.json();
        setCity(data);
        console.log(city);
        setIsLoading(false);
      } else {
        alert("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid className="pt-5 px-5 main">
      <Row>
        <Col xs={7}>
          <Row>
            <Form onSubmit={handleSubmit}>
              <Form.Control type="search" value={query} onChange={handleChange} placeholder="Search Your City" />
            </Form>
          </Row>
          <Row>
            <h2>Popular Cities</h2>
          </Row>
          <Row>
            <DefaultCity lan="51.5072" lon="-0.1276" />
            <DefaultCity lan="40.7128" lon="-74.0060" />
            <DefaultCity lan="41.0091982" lon="28.9662187" />
            <DefaultCity lan="41.8933203" lon="12.4829321" />
          </Row>
          <Row>
            <h2>Search Results</h2>
          </Row>
          <Row>
            {isLoading === false
              ? city.map((data) => {
                  return <DefaultCity lan={data.lat} lon={data.lon} />;
                })
              : "No Search Results Yet"}
          </Row>
        </Col>
        <Col xs={5}>
          <Selected />
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
