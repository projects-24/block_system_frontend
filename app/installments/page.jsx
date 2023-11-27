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
import { PiEye, PiMoney, PiPlus, PiPrinter } from 'react-icons/pi'
import Modal from 'funuicss/ui/modal/Modal'
import CloseModal from 'funuicss/ui/modal/Close'
import Input from 'funuicss/ui/input/Input'
import Col from 'funuicss/ui/grid/Col'
import {FunGet} from 'funuicss/js/Fun'
import Loader from "@/components/Loader"
import Axios  from 'axios'
import SaleModal from '@/components/Sale'

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
    GetRequest("/all/installments")
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
      <SaleModal />

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
            title={"Installments"} 
            sub_title={"view and manage all installment payments."}
            sub_dir={"Dashboard"}
            sub_dir_route={"/dashboard"}
            />
       {
    docs &&
    <Section gap={4} funcss="padding">
    <Card
    header={<>
    <RowFlex gap={1} justify="space-between" funcss="bb padding-bottom-20">
        <div>
        <Text text="Search" funcss="margin-bottom-10"  block size="small" bold color="primary"/>
        <Input bordered rounded />
        </div>
        <div>
        <Button raised bg={"primary"} rounded  text={"Print Docs"} startIcon={<PiPrinter />} /> 
        </div>
    </RowFlex>
    </>}
     funcss="padding-20"
     >
    <Table
    funcss="text-small"
    stripped
 head={<>
         <TableData>customer </TableData>
         <TableData>Price </TableData>
         <TableData>Quantity </TableData>
         <TableData>customer contact</TableData>
         <TableData>Sold By</TableData>
         <TableData>Date</TableData>
         <TableData>Time</TableData>
         <TableData>View</TableData>
         <TableData>Pay</TableData>
       </>}
       body={
           <>
           {
            docs && 
            docs.map(res => (
                <TableRow key={res._id}>
                    <TableData>
                    {res.customer.full_name}
                </TableData>
                <TableData>
                    {res.total_price}
                </TableData>
                <TableData>
                    {res.total_quantity}
                </TableData>
          
                <TableData>
                    {res.customer.contact}
                </TableData>
                <TableData>
                    {res.staff.username}
                </TableData>
                <TableData>
                    {res.analytics.date}
                </TableData>
                <TableData>
                    {res.analytics.time}
                </TableData>
                <TableData>
                   <Button
                   text="View"
                   small 
                   raised 
                   bg="dark"
                   startIcon={<PiEye />}
                   />
                </TableData>
                <TableData>
                <Button
                   text="Pay"
                   small 
                   raised 
                   bg="success"
                   startIcon={<PiMoney />}
                   />
                </TableData>
              </TableRow>
            ))
           }
           </>
       }

/>
    </Card>
    </Section>
}
        </Content>
    </div>
  )
}
