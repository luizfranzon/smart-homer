import { Container, DeviceContainer, DeviceList, DeviceListTitle, Header, IconContainer, MenuButton, ProfileIcon, WelcomeContainer, WelcomeHouseImage, WelcomeText, WelcomeTextBold } from './styles';

import userImage from '../../assets/user.png';
import menuIcon from '../../assets/list.png';
import houseImage from '../../assets/house.png';

import { DeviceCard } from '@components/DeviceCard';
import { useCallback, useContext, useEffect, useState } from 'react';
import { DeviceContext } from 'src/context/ContextProvider';
import { ScrollView, RefreshControl } from 'react-native';

export function Home() {

  const { deviceList, setDeviceList, fetchDaviceData } = useContext(DeviceContext);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    fetchDaviceData();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
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