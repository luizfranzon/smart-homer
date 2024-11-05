import { DeviceCardContainer, DeviceIcon, DeviceTitle, DeviceTitleContainer } from './styles';
import { DeviceContext } from 'src/context/ContextProvider';
import { Switch } from "react-native"
import { useContext } from 'react';
import axios from 'axios';

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
  },
  {
    name: 'window',
    onSrc: require('../../assets/window-on.png'),
    offSrc: require('../../assets/window-off.png')
  },
]

export function DeviceCard({ deviceName, deviceIcon, isActived, endPoint }: DeviceCardProps) {

  const { setDeviceList } = useContext(DeviceContext);

  function handleTogleDeviceStatus() {
    const url = `http://192.168.4.1/api/lights/${endPoint}=${isActived ? 0 : 1}`
    console.log(url)
    axios.post(url)
      .then(response => {
        const responseData: ResponseData = response.data;
        setDeviceList([
          {
            deviceName: 'Sala',
            deviceIcon: 'lamp',
            isActived: responseData.pin16,
            endPoint: 'pin16'
          },
          {
            deviceName: 'Quarto',
            deviceIcon: 'lamp',
            isActived: responseData.pin17,
            endPoint: 'pin17'
          },
          {
            deviceName: 'Janela',
            deviceIcon: 'window',
            isActived: responseData.pin18,
            endPoint: 'pin18'
          }
        ])
      }).catch(error => {
        console.log(`Error: ${error}`);
      })
  }

  return (
    <DeviceCardContainer onPress={handleTogleDeviceStatus} isActivated={isActived}>
      {
        deviceIcon === 'lamp' ?
          <DeviceIcon source={isActived ? iconsSrc[0].onSrc : iconsSrc[0].offSrc} />
          :
          <DeviceIcon source={isActived ? iconsSrc[1].onSrc : iconsSrc[1].offSrc} />
      }
      <DeviceTitleContainer>
        <DeviceTitle isActivated={isActived}>
          {deviceName}
        </DeviceTitle>
        <Switch
          onChange={() => handleTogleDeviceStatus()}
          trackColor={{ false: '#dbe2ea', true: '#ffffff' }}
          thumbColor={isActived ? '#ffffff' : '#ffffff'}
          ios_backgroundColor="#3e3e3e"
          value={isActived}
        />
      </DeviceTitleContainer>
    </DeviceCardContainer>
  )
}