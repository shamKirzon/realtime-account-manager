import Layout from "./app/Layout"
import FilterableProductTable from "./pages/FilterableProductTable"
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import RouteNotFound from "./pages/RouteNotFound"
import ApplicationForm from "./pages/ApplicationForm"
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
          <Route path="/filterable-product-table" element = {<FilterableProductTable setAccount={setAccounts} accountList={accountList} />} /> 
          <Route path="/application-form" element = {<ApplicationForm accountList={accountList} setAccounts={setAccounts}/>} /> 
          <Route path="/fool" element = {<Fool />} /> 
          
        </Routes>
        <Toaster />
      </Layout>
     
    </BrowserRouter>
  )
}

export default App
