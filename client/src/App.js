import "./App.css";
import Logo from "./logo.png";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Launches } from "./components/Launches/Launches";
import { BrowserRouter, Route } from "react-router-dom";
import { LaunchDetails } from "./components/LaunchDetails";
import { RocketDetails } from "./components/RocketDetails.jsx";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <div className="App">
          <img
            src={Logo}
            alt="SpaceX"
            style={{ width: "300px", display: "block", margin: "auto" }}
          />
          <Route path="/" exact component={Launches} />
          <Route path={"/:id"} exact component={LaunchDetails} />
          <Route path={"/rocket/:rocket_id"} exact component={RocketDetails} />
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
