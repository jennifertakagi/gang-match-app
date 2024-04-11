import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";

import { Container, Form } from "./styles";
import { Input } from "@components/Input";

export function Players() {
  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title="Gang name"
        subtitle="add the peeps and separate the teams"
      />

      <Form>
        <Input
          placeholder="Name"
          autoCorrect={false}
        />

        <ButtonIcon
          icon="add"
        />
      </Form>
    </Container>
  )
}