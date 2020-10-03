import {ApolloClient} from "apollo-client"
import {HttpLink} from "apollo-link-http"
import {inMemoryCache} from "apollo-cache-inmemory"
import {ApolloLink} from "apollo-link"
const GITHUB_TOKEN=process.env.REACT_APP_GITHUB_TOKEN

new ApolloLink((operation, forward)=>{
    
})

export default new ApolloClient({
    link:new HttpLink(),
    cache:new inMemoryCache()
})