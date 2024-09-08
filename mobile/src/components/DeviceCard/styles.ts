import styled from "styled-components/native";

interface DeviceCardContainerProps {
  isActivated: boolean;
  onPress: () => void;
}

export const DeviceCardContainer = styled.TouchableOpacity<DeviceCardContainerProps>`
  width: 165px;
  height: 200px;
  border-radius: 24px;
  padding: 8px 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: ${({ isActivated }) => isActivated ? '#000000' : '#f6f8fc'};
`

export const DeviceIcon = styled.Image`
  width: 40px;
  height: 40px;

  margin-top: 18px;
`

export const DeviceTitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const DeviceTitle = styled.Text<{ isActivated: boolean }>`
  font-size: 16px;
  font-family: "Quicksand_700Bold";
  color: ${({ isActivated }) => isActivated ? '#f6f8fc' : '#000000'};
`