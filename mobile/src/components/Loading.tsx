import theme from "@theme/index";
import { Container } from "@screens/Home/styles";
import { ActivityIndicator } from "react-native";

export function Loading() {
  return (
    <Container>
      <ActivityIndicator size="large" color={"black"} />
    </Container>
  );
}