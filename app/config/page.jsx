'use client'
import Content from '@/components/Content'
import NavBar from '@/components/NavBar'
import React, { useEffect, useState } from 'react'
import Card from 'funuicss/ui/card/Card'
import Table from 'funuicss/ui/table/Table'
import TableData from 'funuicss/ui/table/Data'
import TableRow from 'funuicss/ui/table/Row'
import Header from '@/components/Header'
import { EndPoint , GetToken } from '@/default/Functions'
import { GetRequest } from '@/default/Functions'
import ErrorAlert from '@/components/Error'
import RowFlex from 'funuicss/ui/specials/RowFlex'
import Section from 'funuicss/ui/specials/Section'
import Text from 'funuicss/ui/text/Text'
import Button from 'funuicss/ui/button/Button'
import { PiCheck, PiPen, PiPlus, PiTrash, PiX } from 'react-icons/pi'
import Modal from 'funuicss/ui/modal/Modal'
import CloseModal from 'funuicss/ui/modal/Close'
import Input from 'funuicss/ui/input/Input'
import Col from 'funuicss/ui/grid/Col'
import {FunGet} from 'funuicss/js/Fun'
import Loader from "@/components/Loader"
import Axios  from 'axios'
import Circle from "funuicss/ui/specials/Circle"
import Div from 'funuicss/ui/div/Div'
import Alert from "funuicss/ui/alert/Alert"

export default function Products() {
  const [err, seterr] = useState("")
  const [docs, setdocs] = useState('')
  const [loading, setloading] = useState(false)
  const [config, setconfig] = useState('')
  const [modal, setmodal] = useState(false)
  const [success, setsuccess] = useState(false)



  const [user, setuser] = useState("")
  useEffect(() => {
  if(!user){
    GetToken()
    .then( res => {
     setuser(res.user)
    } )
  }
  })

  useEffect(() => {
  setTimeout(() => {
    seterr(false)
    setsuccess(false)
  }, 5000);

  return clearTimeout()
  }, [err , success])
  
  const GetCondig = () => {
    setloading(true)
    GetRequest("/get/threshold")
    .then(res => {
      setdocs(res.data)
      setloading(false)
    })
    .catch( err => {
      setloading(false)
      seterr(err.message)
    } )
  }
  useEffect(() => {
   if(!docs){
    GetCondig()
   }
  })


  const Submit = () => {
    let inputs, products 
    inputs = FunGet.val("#inputs")
    products = FunGet.val("#products")

    const doc = {inputs, products }
   
    if(products && inputs){
      setloading(true)
      setmodal(false)

      Axios.post(EndPoint + "/set/threshold", doc)
      .then( res => {
        setloading(false)
        if(res.data.status == "ok"){
            setsuccess(true)
        }else{
          seterr(res.data.message)
        }
      })
      .catch( err => {
        setloading(false)
        seterr(err.message)
      } )

    }else{
      seterr("Make sure to enter all fields")
      setmodal(false)
    }
  }

  if(docs){
    return (
        <div>
    
    
          {loading && <Loader />}
    
          
          {err && <ErrorAlert message={err} />}
          {success && <Alert type="success" message={"Submitted successfully"} fixed="top-right" />}
    
            <NavBar active={0.1} />
            <Content>
                <Header 
                title={"Configuration"} 
                sub_title={"configure and manage inputs and products threshold"}
                sub_dir={"Dashboard"}
                sub_dir_route={"/dashboard"}
                />
    
                <Section />
                <RowFlex gap={1}>
            <Col>
            <Text 
            text='Inputs Threshold*'
            size='small'
            color='primary'
            bold
            funcss="margin-bottom-10"
            block
            />
             <Input
             bordered 
             fullWidth
             id='inputs'
             defaultValue={docs ? docs.inputs : ""}
             />
            </Col>
            <Col>
            <Text 
            text='Products Threshold*'
            size='small'
            color='primary'
            bold
            funcss="margin-bottom-10"
            block
            />
             <Input
             bordered 
             fullWidth
             type='number'
             id='products'
             defaultValue={docs ? docs.products : ""}
             />
            </Col>
          </RowFlex>
          <Section  gap={2}/>
          <Button
          text='Submit'
          bg='primary'
          raised
          color='text-bold'
          startIcon={<PiCheck />}
          onClick={Submit }
          />
      
            </Content>
        </div>
      )
  }else{
    return <Loader />
  }
}
