import { Container, DeviceContainer, DeviceList, DeviceListTitle, Header, IconContainer, MenuButton, ProfileIcon, WelcomeContainer, WelcomeHouseImage, WelcomeText, WelcomeTextBold } from './styles';

import userImage from '../../assets/user.png';
import menuIcon from '../../assets/list.png';
import houseImage from '../../assets/house.png';

import { DeviceCard } from '@components/DeviceCard';
import { useContext, useEffect } from 'react';
import { DeviceContext } from 'src/context/ContextProvider';
import { ScrollView } from 'react-native';

export function Home() {

  const { deviceList, setDeviceList } = useContext(DeviceContext);

  return (
    <ScrollView>
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
        <DeviceContainer>
          <DeviceListTitle>Dispositivos:</DeviceListTitle>
          <DeviceList>
            {deviceList.map((device, index) => (
              <DeviceCard
                key={device.deviceName}
                deviceName={device.deviceName}
                deviceIcon={device.deviceIcon}
                isActived={device.isActived}
                endPoint={device.endPoint}
                setDeviceList={setDeviceList}
              />
            ))}
          </DeviceList>
        </DeviceContainer>
      </Container>
    </ScrollView>
  );
}