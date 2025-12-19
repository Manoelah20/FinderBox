import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Badge, ProgressBar } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import ItemCard from "../components/ItemCard";
import { getItemIcon } from "../utils/itemIcons";
import { FiPlus, FiSearch, FiPackage, FiCheckCircle, FiClock, FiActivity } from "react-icons/fi";
import { BsGraphUp } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [user] = useAuthState(auth);
  const [itens, setItens] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    encontrados: 0,
    perdidos: 0,
    recentes: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRealData = async () => {
      try {
        // Buscando dados do Firestore ordenados por data
        const itemsRef = collection(db, "items");
        const q = query(itemsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        const data = querySnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
        
        setItens(data);

        // Cálculo de estatísticas reais
        const total = data.length;
        const encontrados = data.filter((item: any) => item.status === 'found' || item.status === 'encontrado').length;
        const perdidos = data.filter((item: any) => item.status === 'lost' || item.status === 'perdido').length;
        
        // Itens dos últimos 3 dias
        const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;
        const recentes = data.filter((item: any) => {
          const itemTime = item.createdAt?.seconds ? item.createdAt.seconds * 1000 : 0;
          return itemTime > threeDaysAgo;
        }).length;

        setStats({ total, encontrados, perdidos, recentes });
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    if (user) {
      fetchRealData();
    }
  }, [user]);

  // Cálculo da taxa de sucesso para evitar divisão por zero
  const successRate = stats.total > 0 ? Math.round((stats.encontrados / stats.total) * 100) : 0;

  return (
    <Container className="py-5">
      <h1 className="mb-4">Dashboard</h1>
      {user ? (
        <>
          <Card className="shadow-sm p-4 mb-4 border-0">
            <h2>Bem-vindo, {user.displayName || user.email}!</h2>
            <p className="text-muted">Aqui você verá suas métricas e atividades reais do FinderBox.</p>
          </Card>

          {/* Cards de Métricas */}
          <Row className="mb-4">
            <Col md={3} xs={6} className="mb-3">
              <Card className="text-center p-3 border-0 shadow-sm">
                <FiPackage className="mb-2 mx-auto" size={24} color="#e0d534" />
                <h4 className="mb-1">{stats.total}</h4>
                <p className="text-muted mb-0 small">Total de Itens</p>
              </Card>
            </Col>
            <Col md={3} xs={6} className="mb-3">
              <Card className="text-center p-3 border-0 shadow-sm">
                <FiCheckCircle className="mb-2 mx-auto" size={24} color="#28a745" />
                <h4 className="mb-1">{stats.encontrados}</h4>
                <p className="text-muted mb-0 small">Encontrados</p>
              </Card>
            </Col>
            <Col md={3} xs={6} className="mb-3">
              <Card className="text-center p-3 border-0 shadow-sm">
                <FiClock className="mb-2 mx-auto" size={24} color="#dc3545" />
                <h4 className="mb-1">{stats.perdidos}</h4>
                <p className="text-muted mb-0 small">Perdidos</p>
              </Card>
            </Col>
            <Col md={3} xs={6} className="mb-3">
              <Card className="text-center p-3 border-0 shadow-sm">
                <FiActivity className="mb-2 mx-auto" size={24} color="#0d6efd" />
                <h4 className="mb-1">{stats.recentes}</h4>
                <p className="text-muted mb-0 small">Recentes</p>
              </Card>
            </Col>
          </Row>

          {/* Barra de Progresso */}
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">Taxa de Recuperação</h5>
                <Badge bg="success">{successRate}%</Badge>
              </div>
              <ProgressBar 
                now={successRate} 
                variant="success" 
                style={{ height: '10px' }}
                animated
              />
            </Card.Body>
          </Card>

          {/* Botões de Ação */}
          <div className="d-flex flex-wrap gap-2 mb-4">
            <Button className="btn-entrar px-4" onClick={() => navigate('/add-item')}>
              <FiPlus className="me-2" /> Novo Item
            </Button>
            <Button variant="outline-secondary" onClick={() => navigate('/search')}>
              <FiSearch className="me-2" /> Buscar
            </Button>
            <Button variant="outline-secondary" onClick={() => navigate('/tracking')}>
              <BsGraphUp className="me-2" /> Relatórios
            </Button>
          </div>

          {/* Lista de Itens Recentes */}
          <h5 className="mb-3">Últimas Atividades</h5>
          <Row>
            {itens.length > 0 ? (
              itens.map((item) => (
                <Col md={4} key={item.id} className="mb-4">
                  <ItemCard item={item} />
                </Col>
              ))
            ) : (
              <Col>
                <p className="text-muted">Nenhum item cadastrado ainda.</p>
              </Col>
            )}
          </Row>
        </>
      ) : (
        <div className="text-center py-5">
          <p className="text-muted">Faça login para acessar seu Dashboard.</p>
          <Button onClick={() => navigate('/login')}>Ir para Login</Button>
        </div>
      )}
    </Container>
  );
};

export default Dashboard;

