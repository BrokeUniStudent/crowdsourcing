import AuthenticationPage from './authenticationPage/AuthenticationPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './homePage/HomePage';

const NoPage = () => {
  return <h1>404</h1>;
};

function App() {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthenticationPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
