import './App.css';
import Chatbot from './components/Chatbot/chatbot';
import Routes from "./Routes";
import { ThemeProvider } from 'styled-components';

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Josefin Sans',
  headerBgColor: '#2586E8',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#2586E8',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

function App() {
  return (
    <div className="bg-gray-200">
      <Routes />
        <ThemeProvider theme={theme}>
          <Chatbot  />
        </ThemeProvider>
    </div>
  );
}

export default App;
