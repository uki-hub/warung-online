import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import Router from "./view/pages/_APP/Router";
import { QueryClientProvider } from "react-query";
import queryService from "./services/queryService";

const App = () => {
  return (
    <QueryClientProvider client={queryService.queryClient}>
      <MantineProvider
        theme={{
          colors: {
            cpink: ["#F0BBDD", "#ED9BCF", "#EC7CC3", "#ED5DB8", "#F13EAF", "#F71FA7", "#FF00A1", "#E00890", "#C50E82", "#AD1374"],
          },
        }}
      >
        <Router />
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
