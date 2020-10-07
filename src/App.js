import React,{ useState } from 'react';
import { ApolloProvider, Mutation, Query } from 'react-apollo'
import client from './client'
import { ADD_STAR, REMOVE_STAR, SEARCH_REPOSITORIES } from './graphql'

const StarButton = props =>{
  const { node, query, first, last, before, after } = props
  const totalCount = node.stargazers.totalCount
  const viewerHasStarred = node.viewerHasStarred
  const starCount= totalCount === 1 ? "1 star" : `${totalCount} stars`
  const StarStatus = ({addOrRemoveStar}) => {
    return(
         <button
          onClick={() =>
            addOrRemoveStar({
                variables: { input: { starrableId: node.id} }
              }) 
          }
         >
           {starCount} | {viewerHasStarred ? "starred": "-"}
         </button>
     )
  }
console.log( query, first, last, before, after )
  return(
    <Mutation
     mutation={viewerHasStarred ? REMOVE_STAR : ADD_STAR}
     refetchQueries={
          [
            {
              query:SEARCH_REPOSITORIES,
              variables: { query, first, last, before, after }
            }
          ]
        }
      >
      {
        addOrRemoveStar => <StarStatus addOrRemoveStar={addOrRemoveStar} />
      }
    </Mutation>
  )

}

const VARIABLES = {
  first:5,
  after:null,
  last:null,
  before:null,
  query:"フロントエンドエンジニア"
}

function App() {
  const [variable,setValiables] = useState(VARIABLES)
  const { query, first, last, before, after } = variable
  const [queryies, setQueries] =useState("")
  const PER_PAGE=5  
  const changeHandler = (e) =>{
    setQueries(e.target.value) 
    setValiables({
      first:PER_PAGE,
      after:null,
      last:null,
      before:null,
      query:queryies
      })
   } 

   const getNext = (search) =>{
    if( queryies ){
      setValiables({
        first:PER_PAGE,
        after:search.pageInfo.endCursor,
        last:null,
        before:null,
        query:queryies
        })
    }else if (queryies　===　""){
      alert("文字を入力してください")
    }
   }
   const getPrevious = (search) =>{
    if( queryies ){
      setValiables({
        first:null,
        after:null,
        last:PER_PAGE,
        before: search.pageInfo.startCursor,
        query:queryies
        })
    }else if (queryies　===　""){
      alert("文字を入力してください")
    }
   }
  return (
    <ApolloProvider client={client}>
      <React.Fragment>
        <form>
          <input value={queryies} onChange={(e)=>changeHandler(e)}/>
        </form>
        <Query 
          query={SEARCH_REPOSITORIES}
          variables={variable}
        >
          {
            ({ loading, error, data})=>{
              if(loading) return "loading..."
              if(error) return `Error ${error.message}`
              const search = data.search
              const repositoryCount=search.repositoryCount
              const resitoryUnit = repositoryCount === 1? "Repository" : "Repositories"
              const title = `GitHub Repositories Search Results - ${repositoryCount} ${resitoryUnit}`
              return (
                <React.Fragment>
                  <div>{title}</div>
                  <ul>
                    {
                      search.edges.map((edge)=>{
                        const node = edge.node
                        return(
                          <li key={node.id}>
                            <a href={node.url} target="_blank" rel="noopener noreferrer">{node.name}</a>
                           <StarButton node={node} {...{query, first, last, after, before}}/>
                          </li>
                        )
                      })
                    }
                  </ul>
                  {
                    search.pageInfo.hasPreviousPage === true ?
                    <button
                      onClick={()=>getPrevious(search)}
                      >
                      Previous
                    </button>
                    :
                    null
                  }
                  {
                    search.pageInfo.hasNextPage === true ?
                      <button
                        onClick={()=>getNext(search)}
                      >
                        Next
                      </button> 
                      :
                      null
                  }
                </React.Fragment>
              )
            }
          }
        </Query>
      </React.Fragment>
    </ApolloProvider>
  );
}

export default App;
