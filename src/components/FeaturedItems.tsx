// src/components/FeaturedItems.tsx

import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getItemIcon } from '../utils/itemIcons';
// import { Item } from '../types/Item'; // Se você estiver usando tipagem real

// Dados Mockados para Exemplo
const mockFeaturedItems = [
    { id: "1", name: "Chaves com Chaveiro", category: "Chaves", location: "Estacionamento - Bloco A", status: "lost", date: "14/12/2025" },
    { id: "2", name: "Carteira Preta", category: "Carteira/Documentos", location: "Refeitório - Próximo às mesas", status: "lost", date: "15/12/2025" },
    { id: "3", name: "Óculos de Grau", category: "Óculos", location: "Sala de Aula 203", status: "found", date: "16/12/2025" },
    { id: "4", name: "Fone de Ouvido Bluetooth", category: "Fone de Ouvido", location: "Laboratório de Informática", status: "found", date: "17/12/2025" },
    { id: "5", name: "Mochila Azul", category: "Mochila", location: "Biblioteca - Sala de Estudo", status: "found", date: "18/12/2025" },
];

// Função auxiliar para determinar cor do Badge
const getStatusVariant = (status: 'lost' | 'found') => {
    return status === 'found' ? 'success' : 'danger'; // 'success' (verde) e 'danger' (vermelho) são classes do Bootstrap
};

const FeaturedItems: React.FC = () => {
    return (
        <Container className="my-5" id="featured-items">
            <h2 className="text-center mb-4">✨ Itens em Destaque</h2>
            
            <Row xs={1} md={2} lg={4} className="g-4">
                {mockFeaturedItems.map((item) => (
                    <Col key={item.id}>
                        {/* Aprimoramento: Card com Fundo Branco, Sombra e Efeito Hover */}
                        <Card className="shadow-lg h-100 border-0 transition-300 transform-on-hover">
                            
                            {/* Icone/Emoji Visual */}
                            <div className="p-3 bg-light d-flex justify-content-center align-items-center featured-icon-container">
                                {getItemIcon(item.category)} 
                            </div>

                            <Card.Body className="d-flex flex-column">
                                {/* NOVO: Badge de Status */}
                                <div className="mb-4">
                                    <Badge pill bg={getStatusVariant(item.status as 'lost' | 'found')}>
                                        {item.status === 'lost' ? 'Perdido' : 'Achado'}
                                    </Badge>
                                </div>

                                <Card.Title className="h5 mb-4 text-truncate">
                                    {item.name}
                                </Card.Title>
                                <Card.Subtitle className="mb-4 text-muted small">
                                    {item.category}
                                </Card.Subtitle>
                                
                                <p className="small mt-auto mb-4 text-dark">
                                    <i className="bi bi-geo-alt-fill me-1"></i> {/* Ícone de Localização (se usando Bootstrap Icons) */}
                                    Encontrado em: **{item.location}**
                                </p>
                                <p className="text-muted fst-italic small">{item.date}</p>

                                <Link to={`/item/${item.id}`} className="mt-2">
                                    <Button className="btn-secondary" size="sm" style={{width: '100%'}}>
                                        Ver Detalhes
                                    </Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default FeaturedItems;