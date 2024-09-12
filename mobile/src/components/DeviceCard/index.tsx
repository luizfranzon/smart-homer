import { useContext, useState } from 'react';
import { DeviceCardContainer, DeviceIcon, DeviceTitle, DeviceTitleContainer } from './styles';
import { Switch } from "react-native"
import axios from 'axios';
import { DeviceContext } from 'src/context/ContextProvider';

interface DeviceCardProps {
  deviceName: string;
  deviceIcon: string;
  isActived: boolean;
  endPoint: string;
  setDeviceList: (deviceList: any) => void;
}

interface ResponseData {
  pin16: boolean;
  pin17: boolean;
  pin18: boolean;
}

const iconsSrc = [
  {
    name: 'lamp',
    onSrc: require('../../assets/on-lamp.png'),
    offSrc: require('../../assets/off-lamp.png')
  }
]

export function DeviceCard({ deviceName, deviceIcon, isActived, endPoint }: DeviceCardProps) {

  const { setDeviceList } = useContext(DeviceContext);

  function handleTogleDeviceStatus() {
    axios.post(`http://192.168.4.1/api/lights/${endPoint}=${isActived ? 0 : 1}`)
      .then(response => {
        const responseData: ResponseData = response.data;
        console.log(responseData.pin16)
        setDeviceList([
          {
            deviceName: 'Sala',
            deviceIcon: 'lamp',
            isActived: responseData.pin16,
            endPoint: 'pin16'
          },
          {
            deviceName: 'Cozinha',
            deviceIcon: 'lamp',
            isActived: responseData.pin17,
            endPoint: 'pin17'
          },
          {
            deviceName: 'Quarto',
            deviceIcon: 'lamp',
            isActived: responseData.pin18,
            endPoint: 'pin18'
          }
        ])
      })
  }

  return (
    <DeviceCardContainer onPress={handleTogleDeviceStatus} isActivated={isActived}>
      <DeviceIcon source={isActived ? iconsSrc[0].onSrc : iconsSrc[0].offSrc} />
      <DeviceTitleContainer>
        <DeviceTitle isActivated={isActived}>
          {deviceName}
        </DeviceTitle>
        <Switch
          trackColor={{ false: '#dbe2ea', true: '#ffffff' }}
          thumbColor={isActived ? '#ffffff' : '#ffffff'}
          ios_backgroundColor="#3e3e3e"
          value={isActived}
        />
      </DeviceTitleContainer>
    </DeviceCardContainer>
  )
}