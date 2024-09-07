import { Container, DeviceListContainer, DeviceListTitle, Header, IconContainer, MenuButton, ProfileIcon, WelcomeContainer, WelcomeHouseImage, WelcomeText, WelcomeTextBold } from './styles';

import userImage from '../../assets/user.png';
import menuIcon from '../../assets/list.png';
import houseImage from '../../assets/house.png';

export function Home() {
  return (
    <Container>
      <Header>
        <MenuButton source={menuIcon} />
        <IconContainer>
          <ProfileIcon source={userImage} />
        </IconContainer>
      </Header>
      <WelcomeContainer>
        <WelcomeText>
          Seja bem-vinda!
        </WelcomeText>
        <WelcomeTextBold>Giovanna Fogaça.</WelcomeTextBold>
        <WelcomeHouseImage source={houseImage} />
      </WelcomeContainer>
      <DeviceListContainer>
        <DeviceListTitle>Dispositivos:</DeviceListTitle>
      </DeviceListContainer>
    </Container>
  );
}