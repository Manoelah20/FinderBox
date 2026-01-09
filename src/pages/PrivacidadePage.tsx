import React from "react";
import { Container, Card } from "react-bootstrap";

const PrivacidadePage: React.FC = () => {
  return (
    <Container className="py-5">
      <Card className="legal-card shadow-lg">
        <Card.Body>
          <h2 className="page-title mb-4">Política de Privacidade</h2>
          <p>
            O FinderBox respeita sua privacidade e cumpre a Lei Geral de Proteção de
            Dados (Lei nº 13.709/2018 - LGPD). Esta política explica como coletamos,
            usamos e protegemos suas informações:
          </p>
          <ul>
            <li>Coletamos apenas os dados necessários para oferecer nossos serviços...</li>
            <li>Seus dados não serão vendidos ou compartilhados...</li>
            <li>Utilizamos medidas de segurança técnicas e organizacionais...</li>
            <li>Você tem o direito de solicitar acesso, correção ou exclusão...</li>
            <li>Ao utilizar o FinderBox, você concorda com esta Política de Privacidade.</li>
          </ul>
          <p className="mt-3">
            Caso tenha dúvidas sobre como tratamos seus dados, entre em contato com
            nosso suporte.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PrivacidadePage;


