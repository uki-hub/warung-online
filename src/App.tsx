import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import Landing from "./view/pages/_APP/Landing";

const App = () => {
  return (
    <MantineProvider
      theme={{
        colors: {
          "blue": ["#7AD1DD", "#5FCCDB", "#44CADC", "#2AC9DE", "#1AC2D9", "#11B7CD", "#09ADC3", "#0E99AC", "#128797", "#147885"],
          "pink": ["#F0BBDD", "#ED9BCF", "#EC7CC3", "#ED5DB8", "#F13EAF", "#F71FA7", "#FF00A1", "#E00890", "#C50E82", "#AD1374"],
        },
      }}
    >
      <Landing />
    </MantineProvider>
  );
};

export default App;
