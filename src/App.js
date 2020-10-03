import React from 'react';
import {ApolloProvider} from "react-apollo"
import client from "./client"
import { Query } from "react-apollo"
import {ME} from "./graphql"
function App() {
  return (
    <ApolloProvider client={client}>
      <div>hello, graphQL</div>
      <Query query={ME}>
        {
          ({ loading, error, data})=>{
            if(loading) return "loading..."
            if(error) return `Error ${error.message}`
            console.log(data.user.name)
            return <div>{data.user.name}</div>
          }
        }
      </Query>
    </ApolloProvider>
  );
}

export default App;
