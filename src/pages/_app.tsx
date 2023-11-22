import { AppProps } from "next/app";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: large;
    border-radius: 10px;
`;

export default function MyApp({ Component, pageProps }: AppProps){
    return (
        <Container>
            <Component {...pageProps} />
        </Container>
    )

}