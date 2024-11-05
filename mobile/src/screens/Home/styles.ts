import styled from "styled-components/native";

export const Container = styled.View`
  margin-top: 40px;
  background-color: ${({ theme }) => theme.COLORS.WHITE[100]};
  align-items: center;
  justify-content: center;

  padding: 0 20px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

export const Header = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const IconContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 9999px;
  height: 48px;
  width: 48px;

  background-color: ${({ theme }) => theme.COLORS.WHITE[300]};
`

export const ProfileIcon = styled.Image`
  width: 28px;
  height: 28px;
`;

export const MenuButton = styled.Image`
  width: 32px;
  height: 32px;
`;

export const WelcomeContainer = styled.View`
  width: 100%;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
`

export const WelcomeText = styled.Text`
  font-size: 20px;

  display: flex;
  flex-direction: col;
  align-items: center;
`

export const WelcomeTextBold = styled.Text`
  /* font-weight: bold; */
  font-size: 20px;
  font-family: "Quicksand_700Bold";
`

export const WelcomeHouseImage = styled.Image`
  width: 160px;
  height: 120px;
  margin-top: -50px;
  margin-left: auto;
  resize-mode: stretch;
`

export const DeviceContainer = styled.View`
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
`

export const DeviceListTitle = styled.Text`
  font-size: 20px;
  font-family: "Quicksand_700Bold";
`

export const DeviceList = styled.View`
  width: 100%;
  margin-top: 20px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
`