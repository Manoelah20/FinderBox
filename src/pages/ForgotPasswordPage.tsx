import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link } from "react-router-dom";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";

export default function ForgotPasswordPage() {

    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setMsg("");
        setErrorMsg("");

        try {
            await sendPasswordResetEmail(auth, email);
            setMsg("E-mail de redefinição enviado. Verifique sua caixa de entrada.");
        } catch (error) {
            setErrorMsg("Erro ao enviar. Verifique o e-mail informado.");
        }
    };

    const handleClear = () => {
        setEmail("");
        setMsg("");
        setErrorMsg("");
    };

    return (
        <Container className="py-5" style={{ maxWidth: "400px" }}>
            <Card className="shadow-lg">
                <Card.Body className="p-4">
                    <h1 className="text-center mb-4">Redefinir Senha</h1>

                    {msg && <Alert variant="success">{msg}</Alert>}
                    {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

                    <Form onSubmit={handleReset}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Digite seu e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button type="submit" variant="primary" className="w-100">
                                Enviar E-mail de Redefinição
                            </Button>
                            <Button type="button" variant="outline-secondary" onClick={handleClear}>
                                Limpar Campos
                            </Button>
                        </div>
                    </Form>

                    <div className="text-center mt-3">
                        <Link to="/login" className="text-decoration-none">
                            Voltar ao Login
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}
