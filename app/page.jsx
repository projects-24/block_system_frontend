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
import { useState , useEffect } from 'react'
import {FunGet} from "funuicss/js/Fun"
import { LoginAccount } from '@/default/Functions'
import Loader from '@/components/Loader'


export default function App() { 
const [message, setmessage] = useState("")
const [loading, setloading] = useState("")

useEffect(() => {
   setTimeout(() => {
     setmessage(false)
   }, 5000);
 
   return clearTimeout()
   }, [message])

const Submit = () => {
   setmessage("")
   let email , password 
   email = FunGet.val("#email")
   password = FunGet.val("#password")

   if(email && password){
      setloading(true)
      LoginAccount(email , password)
      .then( () => {
         window.location.assign("/dashboard")
      } )
      .catch(err => {
         setmessage(err.message)
         setloading(false)
      } )
   }else{
      setmessage("Ënter your  email and password")
   }
}
return (

<div>

   {
      loading && <Loader />
   }

<FullCenteredPage>
<div className='width-300-max fit'>
<div className="margin-bottom-40">
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
   <Alert message={message}  type="danger"  fixed='top-right'/>
}

<Section gap={2} />

     <div className="section">
       <Button
       text={"Let's go"}
       raised
       fullWidth
       bg='primary'
       onClick={Submit}
       />
</div>

   </div>
</FullCenteredPage>
</div>

)
}

