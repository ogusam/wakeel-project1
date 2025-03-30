//import Form from "./components/Form"
import { HashRouter, Route, Routes } from "react-router-dom"
import HomePage from "./components/HomePage"
import AccountType from "./components/AccountType"
import PersonalBanking from './components/Personalbanking'
import OldAccount from "./components/ExistingAccount"



function App() {
  

  return (
    
    <HashRouter basename="/">
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="newAccount" element={<AccountType/>}/>
          <Route path="/personal-banking" element={<PersonalBanking/>}/>
          <Route path='account' element={<OldAccount/>}/>

      </Routes>
    </HashRouter>
  )
}

export default App
