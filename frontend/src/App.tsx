import AuthenticationPage from './authenticationPage/AuthenticationPage';
import HomePage from './homePage/HomePage';
import ReviewerHomePage from './homePage/ReviewerHomePage';
import ResearcherHomePage from './homePage/ResearcherHomePage';
import { useState } from 'react';
import { Role } from './types';

function App() {

  const [role, setRole] = useState<Role>();

  // TODO: route to survey form if logged in

  let content;
  switch (role){
    case Role.participant:
      content = <HomePage />
      break;
    case Role.researcher:
      content = <ResearcherHomePage />
      break;
    case Role.reviewer:
      content = <ReviewerHomePage />
      break;
    default:
      content = <AuthenticationPage setRole={setRole} />
  }

  return (
      content
  )
}

export default App
