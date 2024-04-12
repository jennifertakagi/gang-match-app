import { useState } from 'react';
import { FlatList } from 'react-native'

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Input } from "@components/Input";
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

export function Players() {
  const [team, setTeam] = useState('Gang A')
  const [players, setPlayers] = useState([])

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

      <HeaderList>
        <FlatList
          data={['Gang A', 'Gang B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
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
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard
            name={item}
            onRemove={() => {}}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="There is no one in this gang" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
      />

      <Button
        title="Remove gang"
        type="SECONDARY"
      />
    </Container>
  )
}