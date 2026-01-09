import { Container } from "react-bootstrap";

const HeroSection: React.FC = () => {
  return (
    <header className="hero-section">
      <Container className="text-center">
        <h1 className="hero-title">Perdeu? Achou? A Solução é o FinderBox.</h1>
        <p className="hero-subtitle">
          Busque suas encomendas ou reporte itens perdidos.
        </p>
      </Container>
    </header>
  );
};

export default HeroSection;
