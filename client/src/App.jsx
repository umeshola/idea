import Landing from "./Components/Landing"
import Navbar from "./Components/Navbar";
import YourIdea from "./Components/YourIdea";
import SingleIdea from "./Components/SingleIdea";
import PostIdea from "./Components/PostIdea";
import Friend from "./Components/Friend";
import Buy from "./Components/Buy";
import Help from "./Components/Help";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import Signup from "./Components/Signup";
import './App.css'
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem("token") || ""
  },
});

function App() {
  return (
    <div>
      <Router>
        <div>
          <ApolloProvider client={client}>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/youridea" element={<YourIdea />} />
              <Route exact path="/singleidea/:id" element={<SingleIdea />} />
              <Route exact path="/post" element={<PostIdea />} />
              <Route exact path="/friend" element={<Friend />} />
              <Route exact path="/buy" element={<Buy />} />
              <Route exact path="/help" element={<Help />} />

            </Routes>
          </ApolloProvider>
        </div>
      </Router>
    </div>
  )
}

export default App
