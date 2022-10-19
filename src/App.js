import "./styles.css";
import { Container, Box, Text } from "@chakra-ui/react";
import Chat from "./Components/Chat";
export default function App() {
  // https://17ff65.sse.codesandbox.io/Chat_Application
  return (
    <div>
      <Container
        style={{
          height: "110%",
          borderRadius: "10px"
        }}
      >
        {" "}
        <Chat />
      </Container>
    </div>
  );
}
