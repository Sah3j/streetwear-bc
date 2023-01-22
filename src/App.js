import './App.css';
import LoginPage from "./LoginPage.js";
import LoginForm from "./LoginForm.js";
import SignUpForm from "./SignUpForm.js"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { UserAuthContextProvider } from './context/UserAuthContext';
import ProtectedRoute from "./ProtectedRoute.js"
import ExplorePage from './ExplorePage.js';
import Products from "./Products.js"
import ProfilePage from "./ProfilePage.js"
import SettingsPage from "./SettingsPage.js"
import NameAndPicPage from "./NameAndPicPage.js"


function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <BrowserRouter basename="streetwear-bc">
          <Routes>
            <Route path="/" element={<LoginPage />} >
              <Route index element={<LoginForm />} />
              <Route path="signup" element={<SignUpForm />} />
            </Route>
            <Route path="profile-info" element={<NameAndPicPage/>} />
            <Route path="explore" element={<ProtectedRoute> <ExplorePage/> </ProtectedRoute>} >
              <Route index element={<ProtectedRoute> <Products /> </ProtectedRoute>} />
              <Route path="profile" element={<ProtectedRoute> <ProfilePage /> </ProtectedRoute>} />
              <Route path="setting" element={<ProtectedRoute> <SettingsPage /> </ProtectedRoute>} />
            </Route>
          </Routes>
        </BrowserRouter>      
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
