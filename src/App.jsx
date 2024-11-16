// Import MantineProvider
import { MantineProvider } from "@mantine/core";
import Body from "./components/layout/Body";
import { Toaster } from 'react-hot-toast';


// Define the App component
export default function App() {
  return (
    <MantineProvider>
            <Toaster />

      <Body />
    </MantineProvider>
  );
}
