import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

import { AppError } from "@utils/AppError";
import { groupCreate } from "@storage/group/groupCreate";

import { Container, Content, Icon } from "./styles";

import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";

export function NewGroup() {
  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  async function handleNew() {
    try {

      if (!group.trim().length) {
        return Alert.alert('New gang', 'Write the gang name.');
      }

      await groupCreate(group);
      navigation.navigate('players', { group });
    } catch (error) {
      if(error instanceof AppError) {
        Alert.alert('New gang', error.message);
      } else {
        Alert.alert('New gang', 'It was not possible to create the gang');
        console.log(error);
      }
    }
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
          onChangeText={setGroup}
        />

        <Button
          title="Create"
          style={{ marginTop: 20 }}
          onPress={handleNew}
        />
      </Content>
    </Container>
  )
}