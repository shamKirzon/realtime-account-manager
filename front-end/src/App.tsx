import Layout from "./app/Layout"
import FilterableNames from "./pages/FilterableNames"
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import RouteNotFound from "./pages/RouteNotFound"
import CreateAccount from "./pages/CreateAccount"
import IAccount from "./types/IAccount"
import { useState } from "react"
import { Toaster } from "./components/ui/sonner"
import Fool from "./pages/Fool"

const App = () => {

  const [accountList, setAccounts] = useState<IAccount[]>([])

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element = {<Home />} /> 
          <Route path="/route-not-found" element = {<RouteNotFound />} /> 
          <Route path="/filterable-names" element = {<FilterableNames setAccount={setAccounts} accountList={accountList} />} /> 
          <Route path="/create-account" element = {<CreateAccount accountList={accountList} setAccounts={setAccounts}/>} /> 
          <Route path="/fool" element = {<Fool />} /> 
          
        </Routes>
        <Toaster />
      </Layout>
     
    </BrowserRouter>
  )
}

export default App
