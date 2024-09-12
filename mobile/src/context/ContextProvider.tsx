import axios from "axios";
import { createContext, useEffect, useState } from "react";

interface DeviceContext {
  deviceList: {
    deviceName: string;
    deviceIcon: string;
    isActived: boolean;
    endPoint: string;
  }[],
  setDeviceList: (deviceList: any) => void;
  fetchDaviceData: () => void;
}

interface ResponseData {
  pin16: boolean;
  pin17: boolean;
}

export const DeviceContext = createContext<DeviceContext>({
  deviceList: [
    {
      deviceName: 'Sala',
      deviceIcon: 'lamp',
      isActived: true,
      endPoint: 'pin16'
    },
    {
      deviceName: 'Cozinha',
      deviceIcon: 'lamp',
      isActived: true,
      endPoint: 'pin17'
    },
    {
      deviceName: 'Quarto',
      deviceIcon: 'lamp',
      isActived: true,
      endPoint: 'pin16'
    }
  ],
  setDeviceList: () => {},
  fetchDaviceData: () => {}
})

export function DeviceContextProvider({ children }: { children: React.ReactNode }) {

  const [deviceList, setDeviceList] = useState([
    {
      deviceName: 'Sala',
      deviceIcon: 'lamp',
      isActived: false,
      endPoint: 'pin16'
    },
    {
      deviceName: 'Cozinha',
      deviceIcon: 'lamp',
      isActived: false,
      endPoint: 'pin17'
    },
    {
      deviceName: 'Quarto',
      deviceIcon: 'lamp',
      isActived: false,
      endPoint: 'pin18'
    }
  ])

  useEffect(() => {
    fetchDaviceData()
  }, [])

  async function fetchDaviceData() {
    console.log('fetching data');
    axios.get('http://192.168.4.1/api/lights')
      .then(response => {
        console.log(response.data);
        const responseData = response.data as ResponseData;

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
            isActived: responseData.pin16,
            endPoint: 'pin18'
          }
        ])

      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <DeviceContext.Provider value={{ deviceList, setDeviceList, fetchDaviceData }}>
      {children}
    </DeviceContext.Provider>
  )
}