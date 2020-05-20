import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import 'bulma/css/bulma.css'

// Create the apollo client
const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: 'https://countries.trevorblades.com/graphql'
  }),
  cache: new InMemoryCache(), 
  connectToDevTools: true,
})

// Install the vue plugin
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

// Start the app
new Vue({
  el: '#app',
  apolloProvider,
  render: h => h(App)
});
