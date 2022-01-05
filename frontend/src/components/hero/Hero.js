import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "../ui/button/Button";
import './Hero.css';
import heroPng from '../../img/hero.png';

export const Hero = () => {
  return (
    <Container>
      <section className="hero">
        <Row>
          <Col>
            <h1 className="hero__header">Just Dive in The Tasty World</h1>
            <p className="hero__description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              diam neque, dignissim eu auctor sit amet, porttitor sit amet arcu.
              Cras at quam condimentum, interdum tellus vitae, varius orci. Nunc
              aliquet lorem erat, a maximus diam vehicula ac
            </p>
            <Button>View Menu</Button>
          </Col>
          <Col className="hero__image">
            <img src={heroPng} alt="" />
          </Col>
        </Row>
      </section>
    </Container>
  );
};
