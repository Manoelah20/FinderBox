import React, { useState } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';

interface SearchFormProps {
    onSearch: (term: string, filter: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
    const [term, setTerm] = useState('');
    const [filter, setFilter] = useState('name'); 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(term.trim(), filter);
    };

    return (
        <Form onSubmit={handleSubmit} className="p-4 bg-white shadow-lg rounded-4 border">
            <h4 className="text-center mb-4 fw-bold text-dark">Busca Rápida</h4>
            <Row className="g-3 align-items-center">
                <Col md={7}>
                    <InputGroup size="lg">
                        <InputGroup.Text style={{ background: '#fff', borderRight: 'none' }}>
                            {/* Ícone de Lupa - Placeholder */}
                            🔍
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Buscar item, categoria ou local..."
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                            style={{ borderLeft: 'none' }}
                            required
                        />
                    </InputGroup>
                </Col>
                
                <Col md={3}>
                    <Form.Select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        size="lg"
                    >
                        <option value="name">Nome / Título</option>
                        <option value="category">Categoria</option>
                        <option value="location">Local Encontrado</option>
                    </Form.Select>
                </Col>

                <Col md={2}>
                    <Button 
                        variant="primary" 
                        type="submit" 
                        className="w-100 fw-bold"
                        size="lg"
                    >
                        Buscar
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default SearchForm;