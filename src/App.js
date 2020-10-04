import React,{useState} from 'react';
import {ApolloProvider} from "react-apollo"
import client from "./client"
import { Query } from "react-apollo"
import {SEARCH_REPOSITORIES} from "./graphql"

const VARIABLES = {
  first:5,
  after:null,
  last:null,
  before:null,
  query:"フロントエンドエンジニア"
}

function App() {
  const [variable,setValiables] = useState(VARIABLES)
  const {query, first, last, before, after}=variable
  return (
    <ApolloProvider client={client}>
      <React.Fragment>
        <form>
          <input value={query} onChange={(e)=>{
            setValiables({
              first:5,
              after:null,
              last:null,
              before:null,
              query:e.target.value
              })
          }} />
        </form>
        <Query 
          query={SEARCH_REPOSITORIES}
          variables={{query, first, last, before, after}}
        >
          {
            ({ loading, error, data})=>{
              if(loading) return "loading..."
              if(error) return `Error ${error.message}`
              const search = data.search
              const repositoryCount=search.repositoryCount
              const resitoryUnit = repositoryCount ===1? "Repository" : "Repositories"
              const title = `GitHub Repositories Search Results - ${repositoryCount} ${resitoryUnit}`
              return <div>{title}</div>
            }
          }
        </Query>
      </React.Fragment>
    </ApolloProvider>
  );
}

export default App;
