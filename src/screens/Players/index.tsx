import { useState, useEffect, useRef } from 'react';
import { FlatList, Alert, TextInput, Keyboard } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native';

import { AppError } from '@utils/AppError';

import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Input } from "@components/Input";
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';

type RouteParams = {
  group: string;
}

export function Players() {
  const navigation = useNavigation();

  const [newPlayerName, setNewPlayerName] = useState('');
  const [gang, setGang] = useState('Gang A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const route = useRoute();

  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (!newPlayerName.trim().length) {
      return Alert.alert('New member', 'Write the name of the member you want to add.');
    }

    const newPlayer = {
      name: newPlayerName,
      gang,
    }

    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();

      setNewPlayerName('');
      fetchPlayersByTeam();
    } catch (error) {
      if(error instanceof AppError){
        Alert.alert('New member', error.message);
      } else {
        console.log(error);
        Alert.alert('New member', 'It was not possible to add them.')
      }
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);

      fetchPlayersByTeam()

    } catch (error) {
      console.log(error);

      Alert.alert('Remove member', 'It was not possible to remove this member.');
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate('groups');

    } catch (error) {
      console.log(error);
      Alert.alert('Remover Grupo', 'Não foi posível remover o grupo');
    }
  }

  async function handleGroupRemove() {
    Alert.alert(
      'Remove',
      'Do you want to remove the gang?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => groupRemove() }
      ]
    )
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, gang);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert('Members', 'It was not possible to load members.');
    }
  }

  useEffect(() => {
    fetchPlayersByTeam();
  },[gang])

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subtitle="add members to your gangs"
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Member name"
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />

        <ButtonIcon
          icon="add"
          onPress={handleAddPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList
          data={['Gang A', 'Gang B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === gang}
              onPress={() => setGang(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handlePlayerRemove(item.name)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="There is no one in this gang" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ paddingBottom: 100 }, !players.length && { flex: 1 }]}
      />

      <Button
        title="Remove gang"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  )
}