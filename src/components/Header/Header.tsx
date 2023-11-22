import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 30px;

  a{
    text-decoration: none;
    color: white;
    &:hover{
      color: lightblue;
    }
  }

  > :not(:last-child)::after {
    content: '|';
    margin-left: 10px;
  }
`;

type HeaderProps = React.PropsWithChildren<{}>;

export const Header = ({ children }: HeaderProps) => {
  return <HeaderContainer>{children}</HeaderContainer>;
};
