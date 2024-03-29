import { ThemeProvider } from "styled-components";
import Root from "./Root";
import theme from "./general/utils/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Root />
    </ThemeProvider>
  );
};

export default App;
