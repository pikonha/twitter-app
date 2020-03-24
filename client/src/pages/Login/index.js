import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Layout from "../../components/Layout";
import { Container, Content, Input, Button, ErrorWarning } from "./styles";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const history = useHistory();

  const handleLogin = async event => {
    event.preventDefault();

    if (!username || !password) return;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/login`,
        {
          username,
          password
        }
      );

      localStorage.setItem("SESSION_TOKEN", response.data.token);

      return history.push("/home");
    } catch (e) {
      console.error(e);

      if (e.response.status === 404) {
        setError("Nome de usuário não encontrado.");
      } else if (e.response.status === 400) {
        setError("Senha incorreta.");
      }
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
            <a href="/register">Criar conta</a>
            <Button onClick={handleLogin} type="submit">
              Entrar
            </Button>
          </div>
        </Content>
      </Container>
    </Layout>
  );
}
