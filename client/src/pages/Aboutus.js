import React from "react";
import { Jumbotron, Button, Container, Row } from "react-bootstrap";

const Aboutus = () => {
  return (
    <Container fluid>
      <Jumbotron>
        <Row className="justify-content-center">
          <h3>Kyle</h3>
          <p>
            I am a front-end web developer with strong experience in aesthetic
            design, and professional communication. Having received my
            full-stack development certificate from The University of Utah’s web
            development boot camp, I have strong experience using the full MERN
            stack, as well as experience with SQL databases, vanilla
            javascript/frameworks like jQuery, and CSS libraries such as
            Bootstrap. I especially enjoy bringing a dream design to reality,
            specifically in terms of functionality, and user interactivity.
            Through this career I aspire to grow personally and professionally,
            as well as to work in an environment that aligns with my values and
            allows me to strive for an overall fulfilling life.
          </p>
          <Button
            variant="dark"
            href="https://github.com/Frankenshtien"
            target="blank"
          >
            Check me out on GitHub! <i className="fab fa-github"></i>
          </Button>
        </Row>
        <Row className="justify-content-center">
          <h3>Paul</h3>
          <p>
            Web developer and U.S. Army veteran with a background in psychology,
            and developmental training. On track go complete a full stack web
            development program from the University of Utah. Newly developed
            skills in JavaScript, Responsive Web Design, and Server-side
            Development(Express.js, Node.js). Proven ability to create, develop,
            and instruct lessons which increase knowledge and understanding in
            the given subject. Consistently able to motivate and build profound
            confidence in others performance and abilities.
          </p>
          <Button
            variant="dark"
            href="https://github.com/paulchang15"
            target="blank"
          >
            Check me out on GitHub! <i className="fab fa-github"></i>
          </Button>
        </Row>
        <Row className="justify-content-center">
          <h3>Cory</h3>
          <p>
            Web developer and U.S. Army veteran with a background in psychology,
            and developmental training. On track go complete a full stack web
            development program from the University of Utah. Newly developed
            skills in JavaScript, Responsive Web Design, and Server-side
            Development(Express.js, Node.js). Proven ability to create, develop,
            and instruct lessons which increase knowledge and understanding in
            the given subject. Consistently able to motivate and build profound
            confidence in others performance and abilities.
          </p>
          <Button
            variant="dark"
            href="https://github.com/corycalaway"
            target="blank"
          >
            Check me out on GitHub! <i className="fab fa-github"></i>
          </Button>
        </Row>
        <Row className="justify-content-center">
          <h3>Bret</h3>
          <p>
            Full-stack web developer leveraging background in sales to build
            more intuitive user experiences based on knowing what features and
            benefits sell to the users. Recently earned a certificate in full
            stack development from the University of Utah, with newly developed
            skills in JavaScript, CSS, React.js, and responsive web design.
            Known as an innovative problem solver and excellent communicator
            with a passion for developing apps, with a focus on mobile-first
            design and development. With each project, my aim is to best engage
            my audience for an impactful user experience. I applied aspects of
            UX and agile development, as well as creating RESTful API’s in a
            recent project. I worked on a team of three to develop a social
            media “meme” specific app that allows users to create a profile and
            to share their favorite memes as well as upvote and comment on each
            other's posts. I’m excited to leverage my skills as part of a
            fast-paced, quality-driven team to build better experiences on the
            web.
          </p>
          <Button
            variant="dark"
            href="https://github.com/bret-short"
            target="blank"
          >
            Check me out on GitHub! <i className="fab fa-github"></i>
          </Button>
        </Row>
      </Jumbotron>
    </Container>
  );
};

export default Aboutus;
