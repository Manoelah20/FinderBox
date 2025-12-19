import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import ItemCard from "../components/ItemCard";
import { FiSearch, FiPlusCircle, FiArrowRight } from "react-icons/fi";

const SearchResults: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [recentItems, setRecentItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParam = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "items"));
        const allItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Filtro da busca
        const filtered = allItems.filter((item: any) => 
          item.name?.toLowerCase().includes(queryParam.toLowerCase()) ||
          item.category?.toLowerCase().includes(queryParam.toLowerCase())
        );
        
        setItems(filtered);

        // Se não achar nada, carregar alguns itens recentes como sugestão
        if (filtered.length === 0) {
          const recent = allItems.slice(0, 3); // Pega os 3 primeiros como exemplo
          setRecentItems(recent);
        }
      } catch (error) {
        console.error("Erro na busca:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [queryParam]);

  return (
    <Container className="py-5">
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          {items.length > 0 ? (
            <>
              <h2 className="mb-4">Resultados para: "{queryParam}"</h2>
              <Row>
                {items.map(item => (
                  <Col md={4} key={item.id} className="mb-4">
                    <ItemCard item={item} />
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            // ESTADO VAZIO MELHORADO
            <div className="text-center py-5 bg-light rounded shadow-sm">
              <FiSearch size={60} className="text-muted mb-3" />
              <h3 className="fw-bold">Ops! Não encontramos "{queryParam}"</h3>
              <p className="text-muted mb-4 px-3">
                Não encontramos itens correspondentes. Que tal tentar termos mais genéricos ou cadastrar um novo alerta?
              </p>
              
              <div className="d-flex justify-content-center gap-3 mb-5">
                <Button variant="primary" onClick={() => navigate('/add-item')}>
                  <FiPlusCircle className="me-2" /> Reportar Item
                </Button>
                <Button variant="outline-secondary" onClick={() => navigate('/dashboard')}>
                  Voltar ao Início
                </Button>
              </div>

              {/* SEÇÃO DE SUGESTÕES */}
              <hr className="my-5" />
              <h5 className="mb-4 text-secondary">Itens postados recentemente que podem te interessar:</h5>
              <Row className="justify-content-center">
                {recentItems.map(item => (
                  <Col md={4} key={item.id} className="mb-4">
                    <ItemCard item={item} />
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default SearchResults;


