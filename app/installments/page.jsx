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
import { PiCheck, PiEye, PiMoney, PiPlus, PiPrinter, PiX } from 'react-icons/pi'
import Modal from 'funuicss/ui/modal/Modal'
import CloseModal from 'funuicss/ui/modal/Close'
import Input from 'funuicss/ui/input/Input'
import Col from 'funuicss/ui/grid/Col'
import {FunGet} from 'funuicss/js/Fun'
import Loader from "@/components/Loader"
import Axios  from 'axios'
import SaleModal from '@/components/Sale'
import Alert from 'funuicss/ui/alert/Alert'
import Circle from "funuicss/ui/specials/Circle"
export default function Staffs() {
  const [err, seterr] = useState("")
  const [docs, setdocs] = useState('')
  const [loading, setloading] = useState(false)
  const [modal, setmodal] = useState(false)
  const [installmentModal, setinstallmentModal] = useState(false)
  const [doc, setdoc] = useState("")
  const [modal_type, setmodal_type] = useState("")
  const [success, setsuccess] = useState("")

  const [filter, setfilter] = useState('')

  useEffect(() => {
    setTimeout(() => {
      seterr(false)
      setsuccess(false)
    }, 5000);
  
    return clearTimeout()
    }, [err , success])

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
  
  const HandlePay = () => {
    const amount = FunGet.val("#amount")
    if(amount){
      setloading(true)
      Axios.post(`${EndPoint}/payment/${doc._id}/${amount}`)
      .then( res => {
        setloading("")
        const data = res.data 
        if(data.status == "ok"){
          setdoc("")
          setdocs("")
          setsuccess("Payment made successfully by " + doc.customer.full_name)
        }else{
          seterr(data.message)
        }
      } )
      .catch( err => {
        setloading(false)
        seterr(err.message)
      } )
 
    }else{
      seterr("Make sure to enter the amount to pay")
    }
  }
  return (
    <div>
     {success && <Alert message={success} type="success" fixed="top-right" />}
      {loading && <Loader />}
      <SaleModal 
      close={<CloseModal onClick={() => setinstallmentModal(false)} />}
      open={installmentModal}
      doc={doc}
      footer={<>
          <Text text="Amount (GHC)" funcss="margin-bottom-10" block size="small" bold color="primary"/>
    <Input bordered fullWidth type='number'  id='amount' label={`${doc ? parseFloat(doc.payment.total_amount) - parseFloat(doc.payment.amount_payed) : ""}`} />
      </>}
      modal_type={modal_type}
      paybtn={<RowFlex gap={1} justify='flex-end'>
      <Button
      text='Pay'
      bg='primary'
      raised
      color='text-bold'
      startIcon={<PiCheck />}
      onClick={HandlePay}
      />
  </RowFlex>}
      />

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

        <NavBar active={3} />
        <Content>
            <Header 
            title={"Installments"} 
            sub_title={"view and manage all installment payments."}
            />
       {
    docs &&
    <Section gap={4} funcss="padding">
    <Card
    header={<>
    <RowFlex gap={1} justify="space-between" funcss="bb padding-bottom-20">
        <div>
        <Text text="Search" funcss="margin-bottom-10"  block size="small" bold color="primary"/>
        <Input bordered rounded onChange={ (e) => setfilter(e.target.value) } />
        </div>
        <div>
        {/* <Button raised bg={"primary"} rounded  text={"Print Docs"} startIcon={<PiPrinter />} />  */}
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
         <TableData>Contact</TableData>
         <TableData>Total Amount</TableData>
         <TableData>Amount Payed</TableData>
         <TableData>Done</TableData>
         <TableData>Date</TableData>
         <TableData>Time</TableData>
         <TableData>View</TableData>
         <TableData>Pay</TableData>
       </>}
       body={
           <>
           {
            docs && 
            docs
            .filter(fdoc => {
              if(filter){

                if(
                  filter.toString().trim().toLowerCase().includes(fdoc.customer.full_name.toString().toLowerCase().trim().slice(0 , filter.toString().trim().length))
                  ||
                  filter.toString().trim().toLowerCase().includes(fdoc.customer.contact.toString().toLowerCase().trim().slice(0 , filter.toString().trim().length))
                  ){
                    return fdoc
                  }

              }else{
                return docs
              }
            })
            .map(res => (
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
                    {res.payment.total_amount}
                </TableData>
                <TableData>
                    {res.payment.amount_payed}
                </TableData>
                <TableData>
                    {res.payment.done ?
                      <Circle bg="success" size={2}>
                      <PiCheck />
                    </Circle>
                  :  <Circle bg="error" size={2}>
                  <PiX />
                </Circle>
                  }
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
                   onClick={() => {
                    setdoc(res)
                    setmodal_type("view")
                    setinstallmentModal(true)
                   } }
                   small 
                   raised 
                   bg="dark"
                   startIcon={<PiEye />}
                   />
                </TableData>
                <TableData>
                <Button
                   text="Pay"
                   onClick={() => {
                    setdoc(res)
                    setmodal_type("pay")
                    setinstallmentModal(true)
                   } }
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
