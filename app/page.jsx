"use client"
import React, { useEffect } from 'react'
import Div from 'funuicss/ui/div/Div'
import Section from 'funuicss/ui/specials/Section'
import Text from 'funuicss/ui/text/Text'
import Button from 'funuicss/ui/button/Button'
import Input from 'funuicss/ui/input/Input'
import  FullCenteredPage from 'funuicss/ui/specials/FullCenteredPage';
import { PiPaperPlaneRight , PiKey, PiCheck } from 'react-icons/pi';
import IconicInput from 'funuicss/ui/input/Iconic'
import RowFlex from "funuicss/ui/specials/RowFlex"
import Alert from "funuicss/ui/alert/Alert"
import Link from 'next/link'
import { useState  } from 'react'
import {FunGet} from "funuicss/js/Fun"
import { LoginAccount , EndPoint } from '@/default/Functions'
import Loader from '@/components/Loader'
import Circle from 'funuicss/ui/specials/Circle'
import FunLoader from "funuicss/ui/loader/Loader"
import Axios  from 'axios'

export default function App() { 
const [message, setmessage] = useState("")
const [loading, setloading] = useState("")
const [api_online, setapi_online] = useState(false)
useEffect(() => {
 if(!api_online){
  Axios.get(EndPoint)
  .then((res) => {
    if(res.data.status == "ok"){
      setapi_online(true)
    }
  } )
 }
})

useEffect(() => {
   setTimeout(() => {
     setmessage(false)
   }, 5000);
 
   return clearTimeout()
   }, [message])

const Submit = () => {
 if(api_online){
   let email , password 
   email = FunGet.val("#email")
   password = FunGet.val("#password")

   if(email && password){
      setloading(true)
      LoginAccount(email , password)
      .then( (role) => {
        if(role == "super"){
         window.location.assign("/dashboard")
        }else if(role == 'admin'){
         window.location.assign("/products")
        }else{
         window.location.assign("/store")
        }
      } )
      .catch(err => {
         setmessage(err.message)
         setloading(false)
      } )
   }else{
      setmessage("Ënter your  email and password")
   }
 }else{
   setmessage("Wait for api to finish loadding!")
 }
}
return (

<div>

   {
      loading && <Loader />
   }

<FullCenteredPage funcss="dark900 text-dark">
<div className=' fit' style={{maxWidth:"350px"}}>
<div className="margin-bottom-40">
<RowFlex gap={1} justify='space-between'>
<div>
      <Text
   text='Welcome'
   heading='h2'
   block
   />
   <Text
   text='Sign in to continue!'
   block
   />
      </div>
      <div>
      <RowFlex gap={1}>
  <Text text={"API Status"} bold color='dark300' size='small'/>
 {
  api_online ?
  <Circle size={1.3} bg='success' >
<PiCheck />
</Circle>
:
<Circle size={1.3} bg='dark800 text-dark'>
<FunLoader size={15} />
</Circle>
 }

  </RowFlex>
      </div>
</RowFlex>

</div>
<Section gap={1.5}>
   <Text text="Email*" funcss="margin-bottom-10"  block size="small" bold color="primary"/>
<IconicInput 
   leftIcon={ <PiPaperPlaneRight />}
   input={<Input type="email" id="email" fullWidth bordered />}
    />
</Section>
<Section gap={1}>
   <Text text="Password*" funcss="margin-bottom-10"  block size="small" bold color="primary"/>
<IconicInput 
   leftIcon={  <PiKey />}
   input={<Input type="password" id="password" fullWidth bordered />}
    />
</Section>
{
   message &&
   <Alert message={message}  type="danger"  fixed='top-middle' variant='top-danger' animation='SlideDown'/>
}

<Section gap={2} />

     <div className="section">
       <Button
       text={"Login Account"}
       raised
       fullWidth
       bg='primary'
       onClick={Submit}
       bold 
       endIcon={<PiPaperPlaneRight />}
       />
</div>

   </div>
</FullCenteredPage>
</div>

)
}

