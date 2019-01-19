import React, { Component } from "react";

import "./Header.scss";

import { Button, Col, Container, Form, InputGroup, Navbar, Row } from "react-bootstrap";

class Header extends Component {
  public render() {
    return (
      <header className="appHeader">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Pokedéx</Navbar.Brand>
            <Form inline>
              <InputGroup className="search-input">
                <Form.Control
                  type="text"
                  placeholder="Search by name..."
                  className="border-0"
                />
                <InputGroup.Append>
                  <InputGroup.Text className="search-icon">
                    <i className="fas fa-search" />
                  </InputGroup.Text>
                </InputGroup.Append>

                {/* <Form.Control.Feedback> */}
                {/* </Form.Control.Feedback> */}
              </InputGroup>
              {/* <Button variant="outline-success">Search</Button> */}
            </Form>
          </Container>
        </Navbar>
      </header>
    );
  }
}

export default Header;
