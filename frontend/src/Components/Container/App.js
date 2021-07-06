import { useState } from "react";
import Login from "../Login/Login";
import Dashboard from "../Dashboard/DashBoard";
import { Container } from "@material-ui/core";
import { UserContext } from "../../Context/UserContext";

function App() {
  const [userToken, setUserToken] = useState(null);
  
  return (
    <Container maxWidth="xl">
      <UserContext.Provider value={{userToken}}>
        {userToken == null ? (
          <Login setUserToken={setUserToken} />
        ) : (
          <Dashboard />
        )}
      </UserContext.Provider>
    </Container>
  );
}

export default App;
