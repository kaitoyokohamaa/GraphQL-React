import React from 'react';
import {ApolloProvider} from "react-apollo"
import client from "./client"

function App() {
  return (
    <ApolloProvider client={client}>
      <div>hello, graphQL</div>
    </ApolloProvider>
  );
}

export default App;
