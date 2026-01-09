import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import App from "./App.css"

const AppNavbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Navbar expand="md" className="px-3" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand className="finderbox-title">FinderBox</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-content" />
        <Navbar.Collapse id="navbar-content" className="justify-content-end">
          <Nav>
            <Button className="btn-login me-2" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button className="btn-register" onClick={() => navigate("/register")}>
              Registrar
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;


