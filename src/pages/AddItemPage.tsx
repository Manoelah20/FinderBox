import React, { useState } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { FiArrowLeft, FiHome } from "react-icons/fi";
import toast from "react-hot-toast";

const AddItemPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Geral",
    status: "lost",
    location: "",
    productType: "",
    acquisitionMethod: "",
    deliveryType: ""
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Você precisa estar logado!");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "items"), {
        ...formData,
        userId: user.uid,
        userEmail: user.email,
        createdAt: serverTimestamp(),
      });
      toast.success("Item adicionado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar o item.");
    } finally {
      setLoading(false);
    }
  };

  const buttonStyle = {
    backgroundColor: '#f39c12',
    border: 'none',
    borderRadius: '50px',
    padding: '10px 25px',
    color: '#fff',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm p-4 border-0 mb-4">
            <h2 className="text-center mb-4">Adicionar Novo Item</h2>
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Título do Item</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex: Chave de carro..."
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Localização</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Parque Central..."
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tipo de Produto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Livro, documento, carteira..."
                required
                value={formData.productType}
                onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Método de Aquisição</Form.Label>
              <Form.Control
                type="text"
                placeholder="Comprado, encontrado, alugado, etc..."
                required
                value={formData.acquisitionMethod}
                onChange={(e) => setFormData({ ...formData, acquisitionMethod: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tipo de Entrega/Empresas</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Ifood, Rappi, Loggi, Sedex, Jadlog, etc..."
                required
                value={formData.deliveryType}
                onChange={(e) => setFormData({ ...formData, deliveryType: e.target.value })}
              />
              </Form.Group>
              
              <Form.Group className="mb-4">
                <Form.Label>Descrição Detalhada</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Descreva o item..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </Form.Group>

              <Button 
                type="submit" 
                className="w-100" 
                disabled={loading}
                style={{ ...buttonStyle, borderRadius: '8px', justifyContent: 'center' }}
              >
                {loading ? "Salvando..." : "Adicionar Item"}
              </Button>
            </Form>
          </Card>

          {/* Botões Voltar e Início FORA do Card branco */}
          <div className="d-flex justify-content-center gap-3">
            <Button onClick={() => navigate(-1)} style={buttonStyle}>
              <FiArrowLeft size={20} />
              Voltar
            </Button>

            <Button onClick={() => navigate("/")} style={buttonStyle}>
              <FiHome size={20} />
              Início
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddItemPage;

