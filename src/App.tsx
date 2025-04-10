//import Form from "./components/Form"
import { HashRouter, Route, Routes } from "react-router-dom"
import HomePage from "./components/HomePage"
//import AccountType from "./components/AccountType"
//import PersonalBanking from './components/Personalbanking'
import OldAccount from "./components/ExistingAccount"
import PersonalBanking from "./components/personalBanking/Form"
import CBankingForm from "./components/coperateAccount/Form"
import RequirementsPage from "./components/personalBanking/Requirement"
import RequirementPage from "./components/coperateAccount/Requirements"
//import MultiStepForm from "./components/coperateAccount/Form"



function App() {
  

  return (
    
    <HashRouter basename="/">
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/openaccount" element={<PersonalBanking/>}/>
          <Route path='/createAccount' element={<CBankingForm/>}/>
          <Route path='account' element={<OldAccount/>}/>
          <Route path="cbanking" element={<RequirementPage/>}/>
          <Route path="/personalBanking" element={<RequirementsPage/>}/>
      </Routes>
    </HashRouter>
  )
}

export default App
