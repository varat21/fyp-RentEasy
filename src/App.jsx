// Import MantineProvider
import { MantineProvider } from "@mantine/core";
import Body from "./components/Body";

// Define the App component
export default function App() {
  return (
    <MantineProvider>
      <Body />
    </MantineProvider>
  );
}
