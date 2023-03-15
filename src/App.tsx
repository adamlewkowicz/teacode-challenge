import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { UsersView } from './components/UsersView';

function App() {
  return (
    <ChakraProvider>
      <UsersView />
    </ChakraProvider>
  );
}

export default App;
