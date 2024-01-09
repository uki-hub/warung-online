import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import Landing from "./view/pages/_APP/Landing";

const App = () => {
  return (
    <MantineProvider
      theme={{
        colors: {
          "cpink": ["#F0BBDD", "#ED9BCF", "#EC7CC3", "#ED5DB8", "#F13EAF", "#F71FA7", "#FF00A1", "#E00890", "#C50E82", "#AD1374"],
        },
      }}
    >
      <Landing />
    </MantineProvider>
  );
};

export default App;
