import { Routes, Routes } from "react-router-dom";

import  Home  from "./routes/home/home.routes";
import SignIn  from "./routes/signin/signin.components";
import  SignUp from "./routes/signup/signup.routes";
import  ProfilePage from "./routes/profilePage/profilePage.components";
import HomePage from "./routes/homePage/homePage.routes";
import Edit from "./routes/edit/edit.routes";
import { Route } from 'react-router-dom';


const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/edit" element={<Edit />} />
        </Routes>
    );
};
export default App;

