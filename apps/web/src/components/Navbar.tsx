import React from "react";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { FiUser, FiLayout, FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";

const NavigationBar: React.FC = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout realizado com sucesso!");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao sair.");
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm px-3" style={{ zIndex: 1000 }}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          FinderBox
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Início</Nav.Link>
          </Nav>

          <Nav className="align-items-center">
            {user ? (
              <NavDropdown 
                title={
                  <span className="text-white d-inline-flex align-items-center gap-2">
                    <FiUser /> {user.displayName || "Minha Conta"}
                  </span>
                } 
                id="user-dropdown"
                align="end"
              >
                {/* OPÇÕES SOLICITADAS */}
                <NavDropdown.Item as={Link} to="/tracking" className="d-flex align-items-center">
                  <FiLayout className="me-2" /> Dashboard
                </NavDropdown.Item>
                
               <NavDropdown.Item as={Link} to="/profile">
                  <FiUser className="me-2" /> Perfil
                </NavDropdown.Item>
                
                <NavDropdown.Divider />
                
                <NavDropdown.Item onClick={handleLogout} className="text-danger d-flex align-items-center">
                  <FiLogOut className="me-2" /> Sair
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button as={Link} to="/login" variant="outline-light" className="btn-sm">
                Entrar / Cadastrar
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
