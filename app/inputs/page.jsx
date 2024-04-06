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

export default function Products() {
  const [err, seterr] = useState("")
  const [docs, setdocs] = useState('')
  const [loading, setloading] = useState(false)
  const [udoc, setudoc] = useState('')
  const [modal, setmodal] = useState(false)
  const [modal2, setmodal2] = useState(false)
  const [delete_doc, setdelete_doc] = useState("")

  const [config, setconfig] = useState("")
  

  useEffect(() => {
   if(!config){
    GetRequest("/get/threshold")
    .then(res => {
      setconfig(res.data)
      setloading(false)
    })
    .catch( err => {
      setloading(false)
      seterr(err.message)
    } )
   }
  })


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
  }, 5000);

  return clearTimeout()
  }, [err])
  
  const GetProducts = () => {
    setloading(true)
    GetRequest("/all/inputs")
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
    GetProducts()
   }
  })


  const Submit = () => {
    let name, unit , quantity , in_stock
    name = FunGet.val("#name")
    unit = FunGet.val("#unit")
    quantity = FunGet.val("#quantity")
    in_stock = FunGet.val("#in_stock")

    const doc = {
        name ,
        quantity,
        measurement:unit ,
        in_stock: in_stock.toString() == "true" ? true : false
    }
   
    if(
      name &&
      quantity &&
      unit && 
      in_stock
    ){
      setloading(true)
      setmodal(false)

      if(udoc){
     console.log(doc)
      Axios.patch(EndPoint + "/update/input/" + udoc._id, doc)
      .then( res => {
        setudoc("")
        setloading(false)
        if(res.data.status == "ok"){
          setdocs("")
        }else{
          seterr(res.data.message)
        }
      })
      .catch( err => {
        setudoc("")
        setloading(false)
        seterr(err.message)
      } )
      }else{
        
      Axios.post(EndPoint + "/new/input", doc)
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
      }

    }else{
      seterr("Make sure to enter all fields")
      setmodal(false)
    }
  }

  const HandleDelete = (id) => {
    setloading(true)
    setmodal2(false)
    Axios.delete(EndPoint + "/delete/input/" + id)
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
  }
  
  return (
    <div>
<Modal 
animation="SlideDown" 
duration={0.2} 
open={modal2}
maxWidth="500px"
flat
title={
<Div funcss="container">
<RowFlex justify='space-between'>
        <Text 
        text={`Delete ${delete_doc ? delete_doc.name : ''}`}
        heading='h4'
        />
        <PiX 
        className='pointer '
        onClick={() => setmodal2(false) }
        />
    </RowFlex>
</Div>
}
body={
    <Div funcss="container">
        <Text
        text="Are you sure your want to delete the product"
       article
       />
</Div>
}
footer={
  <RowFlex funcss='container' gap={1} justify='flex-end'>
      <Button
      text='No'
      color='error text-bold'
      startIcon={<PiX />}
      onClick={() => setmodal2(false) }
      />
      <Button
      text='Yes'
      bg='primary'
      raised
      color='text-bold'
      startIcon={<PiCheck />}
      onClick={() => HandleDelete(delete_doc._id) }
      />
  </RowFlex>
}

/>

      {loading && <Loader />}

<Modal 
animation="SlideRight" 
duration={0.4} 
flat
open={modal}
maxWidth="500px"
position="left"
title={<Text text={udoc ? udoc.name : "New Input"} heading='h4' funcss='padding' block/>}
body={
  <div>
      <RowFlex gap={1}>
        <Col>
        <Text 
        text='Name*'
        size='small'
        color='primary'
        bold
        funcss="margin-bottom-10"
        block
        />
         <Input
         bordered 
         fullWidth
         id='name'
         defaultValue={udoc ? udoc.name : ""}
         />
        </Col>
        <Col>
        <Text 
        text='Quantity*'
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
         id='quantity'
         defaultValue={udoc ? udoc.quantity : ""}
         />
        </Col>
      </RowFlex>
   
      <Section />
        <Col>
        <Text 
        text='Unit*'
        size='small'
        color='primary'
        bold
        funcss="margin-bottom-10"
        block
        />
         <Input
         bordered 
         fullWidth
         id='unit'
         select
         options={[
            { text: "Grams", value: "g" },
            { text: "Bag", value: "bag" },
            { text: "Kilograms", value: "kg" },
            { text: "Milligrams", value: "mg" },
            { text: "Micrograms", value: "µg" },
            { text: "Liters", value: "L" },
            { text: "Milliliters", value: "mL" },
            { text: "Cubic Centimeters", value: "cm³" },
            { text: "Cubic Meters", value: "m³" },
            { text: "Pieces", value: "pcs" },
            { text: "Dozen", value: "doz" },
          ]}
         defaultValue={udoc ? udoc.measurement : ""}
         />
        </Col>
      <Section />
        <Col>
        <Text 
        text='Status*'
        size='small'
        color='primary'
        bold
        funcss="margin-bottom-10"
        block
        />
         <Input
         bordered 
         fullWidth
         id='in_stock'
         select
         options={[
            { text: "In stock", value: true },
            { text: "Out of stock", value: false },
          ]}
         defaultValue={udoc ? udoc.in_stock : ""}
         />
        </Col>
   

    

         
</div>
}
footer={
 <RowFlex justify='flex-end' gap={0.5} >
       <Button 
bg="error"
text="Cancel"
raised
rounded
onClick={()=>setmodal(false)}
/>
<Button 
bg="primary"
raised
text="Submit"
startIcon={<PiCheck />}
rounded
onClick={()=> Submit()}
/>
 </RowFlex>
}
/>
      
      {err && <ErrorAlert message={err} />}

        <NavBar active={5} />
        <Content>
            <Header 
            title={"Inputs"} 
            sub_title={"create and manage inputs"}
            />
            <Card
            header={
            <RowFlex funcss="padding bb text-dark" gap={1} justify="space-between">
              <div>
              <Text text={"Total"} size='small' color='primary' bold/>
            <Text text={docs ? docs.length : ""} block heading='h3'/>
              </div>
    <Button 
   fillAnimation 
   outlined 
   outlineSize={0.13}
   startIcon={<PiPlus />}
   onClick={ () => {
    setmodal(true) 
    setudoc("")
   }}
   fillTextColor='dark900' 
    bg="indigo600" 
    text="Create Input"
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
    <TableData>No</TableData>
         <TableData>Name</TableData>
         <TableData>Quantity</TableData>
         <TableData>Status</TableData>
         <TableData>Threshold</TableData>
         <TableData>Update</TableData>
         <TableData>Delete</TableData>
       </>}
       body={
           <>
        {
          docs && config &&
          docs.map(res => (
            <TableRow key={res._id}>
            <TableData>{res.number}</TableData>
            <TableData>{res.name}</TableData>
           <TableData> <Text bold color="primary" text={<>{res.quantity} {res.measurement}</>} /> </TableData>
           <TableData>
            {
            res.in_stock ?
            <Circle bg="success" size={2}>
            <PiCheck />
          </Circle>
          : <Circle bg="error" size={2}>
          <PiX />
        </Circle>
          }
          </TableData>
           <TableData>
           {
            res.quantity > config.inputs  ? 
            <Circle bg="success" size={2}>
              <PiCheck />
            </Circle>
          :  <Circle bg="error" size={2}>
          <PiX />
        </Circle>
          }
          </TableData>
           <TableData>
            <span onClick={ () => {
              setudoc(res)
              setmodal(true)
            } }>
     <Circle  size={2} raised bg='success' >
              <PiPen />
            </Circle>
            </span>
       
           </TableData>
           <TableData>
           <span onClick={() => {
            setmodal2(true)
            setdelete_doc(res)
           } }>
           <Circle  size={2} raised bg='error'>
              <PiTrash />
            </Circle>
           </span>
           </TableData>
     
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
