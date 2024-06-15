import { AppProps } from 'next/app';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  );
}
