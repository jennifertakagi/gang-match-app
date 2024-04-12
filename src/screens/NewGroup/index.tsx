import { useNavigation } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";

import { Container, Content, Icon } from "./styles";

export function NewGroup() {
  const navigation = useNavigation()

  function handleNew() {
    navigation.navigate('players', { group: 'Rocket' })
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <Highlight
          title="New gang"
          subtitle="create new gang to add people"
        />

        <Input
          placeholder="Gang name"
        />

        <Button
          title="Create"
          style={{ marginTop: 20 }}
        />
      </Content>
    </Container>
  )
}