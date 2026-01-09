// src/components/SearchForm.tsx
import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

interface SearchFormProps {
  onSearch: (term: string, filter: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [term, setTerm] = useState("");
  const [filter, setFilter] = useState("name"); // valor padrão

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(term, filter);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="align-items-center">
        <Col md={8} className="mb-3 mb-md-0">
          <Form.Control
            type="text"
            placeholder="Digite o termo de busca..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="name">Nome</option>
            <option value="category">Categoria</option>
          </Form.Select>
        </Col>
      </Row>
      <div className="mt-3 text-center">
        <Button type="submit" variant="primary">
          Buscar
        </Button>
      </div>
    </Form>
  );
};

export default SearchForm;
