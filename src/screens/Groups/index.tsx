import { useState } from 'react';
import { FlatList } from 'react-native';

import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';

import { Container } from './styles';

export function Groups() {
  const [groups, setGroups] = useState<string[]>(['Personification']);

  return (
    <Container>
      <Header />
      <Highlight
        title="Gang Match"
        subtitle="play with your gang"
      />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
          />
        )}
      />
    </Container>
  );
}