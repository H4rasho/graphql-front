import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
const client = new ApolloClient({
  link: createUploadLink({
    // Remplazar por uri de produccion
    uri: "https://localhost:4000",
  }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
