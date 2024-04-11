import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';

import { Container } from './styles';

export function Groups() {
  return (
    <Container>
      <Header />
      <Highlight
        title="Gang Match"
        subtitle="play with your gang"
      />
    </Container>
  );
}