import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { auth, db } from "../firebaseConfig";
import { updateProfile } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import ItemCard from "../components/ItemCard";
import { FiUser, FiMail, FiPackage, FiSave } from "react-icons/fi";

const ProfilePage: React.FC = () => {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [myItems, setMyItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchMyItems = async () => {
      if (!user) return;
      try {
        // Busca apenas itens onde o criador (UID) é o utilizador atual
        // Nota: Garante que gravas o 'userId' ao criar o item na AddItemPage
        const q = query(collection(db, "items"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMyItems(items);
      } catch (error) {
        console.error("Erro ao carregar itens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyItems();
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setUpdating(true);
    try {
      await updateProfile(user, { displayName });
      setMessage({ type: "success", text: "Perfil atualizado com sucesso!" });
    } catch (error) {
      setMessage({ type: "danger", text: "Erro ao atualizar perfil." });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Container className="py-5">
      <Row>
        {/* Coluna da Esquerda: Dados do Perfil */}
        <Col lg={4} className="mb-4">
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4 text-center">
              <div className="bg-light rounded-circle d-inline-flex p-4 mb-3">
                <FiUser size={50} className="text-primary" />
              </div>
              <h4 className="fw-bold">{user?.displayName || "Utilizador"}</h4>
              <p className="text-muted small mb-4">
                <FiMail className="me-1" /> {user?.email}
              </p>
              
              <hr />

              <Form onSubmit={handleUpdateProfile} className="text-start">
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Nome de Exibição</Form.Label>
                  <Form.Control
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Teu nome completo"
                  />
                </Form.Group>
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 d-flex align-items-center justify-content-center"
                  disabled={updating}
                >
                  {updating ? <Spinner size="sm" className="me-2" /> : <FiSave className="me-2" />}
                  Guardar Alterações
                </Button>
              </Form>

              {message.text && (
                <Alert variant={message.type} className="mt-3 small py-2">
                  {message.text}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Coluna da Direita: Meus Itens Reportados */}
        <Col lg={8}>
          <div className="d-flex align-items-center mb-4">
            <FiPackage size={24} className="me-2 text-primary" />
            <h3 className="mb-0 fw-bold">Meus Itens Reportados</h3>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : myItems.length > 0 ? (
            <Row>
              {myItems.map((item) => (
                <Col md={6} key={item.id} className="mb-4">
                  <ItemCard item={item} />
                </Col>
              ))}
            </Row>
          ) : (
            <Card className="text-center py-5 border-0 shadow-sm">
              <Card.Body>
                <p className="text-muted">Ainda não reportaste nenhum item.</p>
                <Button variant="outline-primary" href="/add-item">
                  Reportar Agora
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
