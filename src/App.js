import { Route, Routes } from "react-router-dom";

import Home from "./routes/home/home.routes";
import SignIn from "./routes/signIn/signIn.components";
import SignUp from "./routes/signUp/signUp.routes";
import ProfilePage from "./routes/profilePage/profilePage.component";
import HomePage from "./routes/homePage/homePage.routes";
import Edit from "./routes/edit/edit.routes";

//import './firebase/firebase.utils';
//import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from './utils/firebase/firebase.utils';



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profilepage" element={<ProfilePage />} />
      <Route path="/homepage/:id" element={<HomePage />} />
      <Route path="/editprofile/:id" element={<Edit />} />

      
    </Routes>
  );
}

export default App;