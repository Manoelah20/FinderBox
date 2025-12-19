// src/components/Footer.tsx
import React from "react";
import { Container } from "react-bootstrap";

const Footer: React.FC = () => {
  return (
    <footer className="app-bar mt-5">
      <Container className="text-center py-3">
        <p className="mb-1">
          FinderBox © 2025 — Desenvolvido por Manoela Harrison
        </p>
        <p>
          <a href="/termos">Termos de Uso</a> |{" "}
          <a href="/privacidade">Política de Privacidade</a>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;

