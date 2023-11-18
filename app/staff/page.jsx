'use client'
import Content from '@/components/Content'
import NavBar from '@/components/NavBar'
import React, { useEffect, useState } from 'react'
import Card from 'funuicss/ui/card/Card'
import Table from 'funuicss/ui/table/Table'
import TableData from 'funuicss/ui/table/Data'
import TableRow from 'funuicss/ui/table/Row'
import Header from '@/components/Header'
import { EndPoint } from '@/default/Functions'
import { GetRequest } from '@/default/Functions'
import ErrorAlert from '@/components/Error'
import RowFlex from 'funuicss/ui/specials/RowFlex'
import Section from 'funuicss/ui/specials/Section'
import Text from 'funuicss/ui/text/Text'
import Button from 'funuicss/ui/button/Button'
import { PiPlus } from 'react-icons/pi'
import Modal from 'funuicss/ui/modal/Modal'
import CloseModal from 'funuicss/ui/modal/Close'
import Input from 'funuicss/ui/input/Input'
import Col from 'funuicss/ui/grid/Col'
import {FunGet} from 'funuicss/js/Fun'
import Loader from "@/components/Loader"
import Axios  from 'axios'

export default function Staffs() {
  const [err, seterr] = useState("")
  const [docs, setdocs] = useState('')
  const [loading, setloading] = useState(false)
  const [modal, setmodal] = useState(false)
  useEffect(() => {
  setTimeout(() => {
    seterr(false)
  }, 5000);

  return clearTimeout()
  }, [err])
  
  const GetStaffs = () => {
    setloading(true)
    GetRequest("/staffs")
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
    GetStaffs()
   }
  })


  const Submit = () => {
    let email, username , contact, role, password , address
    email = FunGet.val("#email")
    username = FunGet.val("#username")
    address = FunGet.val("#address")
    contact = FunGet.val("#contact")
    role = FunGet.val("#role")
    password = FunGet.val("#password")

    const doc = {email, username, contact, role, password , address}
   
    if(
      email &&
      username &&
      address &&
      contact &&
      role &&
      password 
    ){
      setloading(true)
      setmodal(false)

      Axios.post(EndPoint + "/staffs/register", doc)
      .then( res => {
        setloading(false)
        if(res.data.status == "ok"){
          setdocs("")
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
  
  return (
    <div>

      {loading && <Loader />}

<Modal 
animation="ScaleUp" 
duration={0.4} 
open={modal}
backdrop
maxWidth="500px"
title={<Text text="Create Staff" heading='h4' funcss='padding' block/>}
body={
  <div>
      <RowFlex gap={1}>
        <Col>
        <Text 
        text='Fullname*'
        size='small'
        color='primary'
        bold
        />
         <Input
         bordered 
         fullWidth
         id='username'
         />
        </Col>
        <Col>
        <Text 
        text='Contact*'
        size='small'
        color='primary'
        bold
        />
         <Input
         bordered 
         fullWidth
         id='contact'
         />
        </Col>
      </RowFlex>
      <Section />
      <RowFlex gap={1}>
        <Col>
        <Text 
        text='Address*'
        size='small'
        color='primary'
        bold
        />
         <Input
         bordered 
         fullWidth
         id='address'
         />
        </Col>
        <Col>
        <Text 
        text='Email*'
        size='small'
        color='primary'
        bold
        />
         <Input
         bordered 
         fullWidth
         id='email'
         />
        </Col>

      </RowFlex>
      <Section />
      <Col>
        <Text 
        text='Role*'
        size='small'
        color='primary'
        bold
        />
         <Input
         bordered 
         fullWidth
         id='role'
         select 
         options={[
          {
              value:"staff",
              text:"Staff"
          },
          {
              value:"admin",
              text:"Admin"
          }
         ]}
         />
        </Col>
        <Section />
        <Col>
        <Text 
        text='Password*'
        size='small'
        color='primary'
        bold
        />
         <Input
         bordered 
         fullWidth
         id='password'
         type='password'
         />
        </Col>

         
</div>
}
footer={
 <RowFlex justify='flex-end' gap={0.5} >
       <Button 
bg="error"
text="Cancel"
rounded
onClick={()=>setmodal(false)}
/>
<Button 
bg="primary"
raised
text="Create"
rounded
onClick={()=> Submit()}
/>
 </RowFlex>
}
/>
      
      {err && <ErrorAlert message={err} />}

        <NavBar active={4} />
        <Content>
            <Header 
            title={"Staffs"} 
            sub_title={"create and manage staffs"}
            sub_dir={"Dashboard"}
            sub_dir_route={"/dashboard"}
            />
            <Card
            header={
            <RowFlex funcss="padding dark900 text-dark" gap={1} justify="space-between">
              <div>
              <Text text={"Total"} size='small' color='primary' bold/>
            <Text text={docs ? docs.length : ""} block heading='h3'/>
              </div>
    <Button 
   fillAnimation 
   outlined 
   outlineSize={0.13}
   startIcon={<PiPlus />}
   onClick={ () => setmodal(true) }
   fillTextColor='dark900' 
    bg="indigo600" 
    text="Create Staff"
    fillDirection='bottom'
    />
            </RowFlex>
            }
            >
            <Table 
       funcss='text-small'
       hoverable
       stripped
       head={<>
    <TableData>Fullname</TableData>
         <TableData>Role</TableData>
         <TableData>Contact</TableData>
         <TableData>Address</TableData>
       </>}
       body={
           <>
        {
          docs &&
          docs.map(res => (
            <TableRow>
            <TableData>{res.username}</TableData>
            <TableData>{res.role}</TableData>
            <TableData>{res.contact}</TableData>
            <TableData>{res.address}</TableData>
          </TableRow>
          ))
        }
           </>
       }
       >


 </Table>
            </Card>
        </Content>
    </div>
  )
}
