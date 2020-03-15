import React from "react";

import { Container, Content, Input, Button } from "./styled";

export default function Login() {
  return (
    <Container>
      <Content>
        <div>
          <label>Nome do usuário</label>
          <Input type="text" />
        </div>
        <div>
          <label>Senha</label>
          <Input type="password" />
        </div>

        <div>
          <a href="/register">Criar conta</a>
          <Button type="submit">Entrar</Button>
        </div>
      </Content>
    </Container>
  );
}
