
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";

import { Container } from "./styles";
import { ButtonIcon } from "@components/ButtonIcon";

export function Players() {
  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title="Gang name"
        subtitle="add the peeps and separate the teams"
      />

    <ButtonIcon />
    </Container>
  )
}