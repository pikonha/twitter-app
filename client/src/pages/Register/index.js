import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Layout from "../../components/Layout";
import { Container, Content, Input, Button, ErrorWarning } from "./styles";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const history = useHistory();

  const handleRegister = async event => {
    event.preventDefault();

    if (!username || !password) return;

    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/register`, {
        username,
        password
      });

      return history.push("/");
    } catch (e) {
      console.error(e);
      setError("Nome de usuário já existente.");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <Layout>
      <Container>
        <Content>
          {error && <ErrorWarning>{error}</ErrorWarning>}

          <div>
            <label>Nome do usuário</label>
            <Input
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <label>Senha</label>
            <Input
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
            />
          </div>

          <div>
            <a href="/">Cancelar</a>
            <Button onClick={handleRegister} type="submit">
              Registrar
            </Button>
          </div>
        </Content>
      </Container>
    </Layout>
  );
}
