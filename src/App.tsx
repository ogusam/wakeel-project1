//import Form from "./components/Form"
import { HashRouter, Route, Routes } from "react-router-dom"
import HomePage from "./components/HomePage"
//import AccountType from "./components/AccountType"
//import PersonalBanking from './components/Personalbanking'
import OldAccount from "./components/ExistingAccount"
import PersonalBanking from "./components/personalBanking/Form"
import CBankingForm from "./components/coperateAccount/Form"
//import MultiStepForm from "./components/coperateAccount/Form"



function App() {
  

  return (
    
    <HashRouter basename="/">
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/personalBanking" element={<PersonalBanking/>}/>
          <Route path='/cbanking' element={<CBankingForm/>}/>
          <Route path='account' element={<OldAccount/>}/>

      </Routes>
    </HashRouter>
  )
}

export default App
