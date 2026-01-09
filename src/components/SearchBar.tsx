import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <Form className="d-flex" onSubmit={handleSearch}>
      <Form.Control
        type="text"
        placeholder="Digite o item ou encomenda..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="me-2"
      />
      <Button type="submit" variant="primary">
        Buscar
      </Button>
    </Form>
  );
};

export default SearchBar;
