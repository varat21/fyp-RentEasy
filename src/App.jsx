// Import MantineProvider
import { MantineProvider } from "@mantine/core";
import Body from "./components/layout/Body";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from "./components/hooks/AuthContext";


// Define the App component
export default function App() {
  return (
    <MantineProvider>
      <AuthProvider>
            <Toaster />

      <Body />
      </AuthProvider>
    </MantineProvider>
  );
}
