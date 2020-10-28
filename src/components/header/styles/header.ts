import styled from 'styled-components/macro';
export const Bacground = styled.div<{ src?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 640px;
  box-shadow: 0px 2px 2px -2px rgba(255, 255, 255, 0.2);
  ${(props) =>
    props.src
      ? `background-image:url(../assets/images/${props.src}.png)`
      : `background-image:url(../assets/images/bg_home_transparent.png)`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const Container = styled.div`
  width: 100%;
  height: 640px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0px 2px 2px -2px rgba(255, 255, 255, 0.2);
`;
export const Content = styled.div`
  flex-grow: 1;
`;
export const Inner = styled.div`
  max-width: 1100px;
  padding-top: 1rem;
  padding-bottom: 1rem;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
export const Title = styled.h1`
  max-width: 640px;
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.8rem;
  @media (min-width: 960px) {
    font-size: 2.4rem;
  }
`;
export const SubTitle = styled.p`
  font-size: 1.3rem;
  text-align: center;
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.theme.colors.primary_darker};
`;
