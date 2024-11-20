import ReactDOM from 'react-dom/client';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import { App } from './App';
import './index.css';

const rootelement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootelement);

const client = new ApolloClient({
  uri: 'https://spacex-production.up.railway.app/',
  cache: new InMemoryCache()
});

root.render(
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
);
