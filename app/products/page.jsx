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
    GetRequest("/all/products")
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
    let name, number , price, description
    name = FunGet.val("#name")
    price = FunGet.val("#price")
    description = FunGet.val("#description")
    status = FunGet.val("#status")

    const doc = {
      product:{
        name ,
        price,
        description ,
        status
      },
      price,
      staff:user
    }
   
    if(
      name &&
      price &&
      description 
    ){
      setloading(true)
      setmodal(false)

      if(udoc){
     
      Axios.patch(EndPoint + "/update/product/" + udoc._id, doc)
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
        
      Axios.post(EndPoint + "/new/product", doc)
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
    Axios.delete(EndPoint + "/delete/" + id)
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
animation="Opacity" 
duration={1} 
open={modal2}
maxWidth="500px"
title={
<Div funcss="container">
<RowFlex justify='space-between'>
        <Text 
        text={`Delete ${delete_doc ? delete_doc.product.name : ''}`}
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
animation="ScaleUp" 
duration={0.4} 
open={modal}
backdrop
maxWidth="500px"
title={<Text text={udoc ? udoc.product.name : "New Product"} heading='h4' funcss='padding' block/>}
body={
  <div>
      <RowFlex gap={1}>
        <Col>
        <Text 
        text='Product Name*'
        size='small'
        color='primary'
        bold
        />
         <Input
         bordered 
         fullWidth
         id='name'
         defaultValue={udoc ? udoc.product.name : ""}
         />
        </Col>
        <Col>
        <Text 
        text='Price*'
        size='small'
        color='primary'
        bold
        />
         <Input
         bordered 
         fullWidth
         type='number'
         id='price'
         defaultValue={udoc ? udoc.price : ""}
         />
        </Col>
      </RowFlex>
      <Section />
        <Col>
        <Text 
        text='Description*'
        size='small'
        color='primary'
        bold
        />
         <Input
         bordered 
         fullWidth
         multiline
         rows={4}
         id='description'
         defaultValue={udoc ? udoc.product.description : ""}
         />
        </Col>
      <Section />
        <Col>
        <Text 
        text='Availabilty*'
        size='small'
        color='primary'
        bold
        />
         <Input
         bordered 
         fullWidth
         id='status'
         select
         options={[
          {text:"Available" , value:"available"},
          {text:"Not Available" , value:"not available"}
         ]}
         defaultValue={udoc ? udoc.product.status : ""}
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
text="Submit"
startIcon={<PiCheck />}
rounded
onClick={()=> Submit()}
/>
 </RowFlex>
}
/>
      
      {err && <ErrorAlert message={err} />}

        <NavBar active={2} />
        <Content>
            <Header 
            title={"Products"} 
            sub_title={"create and manage Products"}
            sub_dir={"Dashboard"}
            sub_dir_route={"/dashboard"}
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
    text="Create product"
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
         <TableData>Price</TableData>
         <TableData>Status</TableData>
         <TableData>Update</TableData>
         <TableData>Delete</TableData>
       </>}
       body={
           <>
        {
          docs &&
          docs.map(res => (
            <TableRow key={res._id}>
            <TableData>{res.number}</TableData>
            <TableData>{res.product.name}</TableData>
           <TableData>{res.price}</TableData>
           <TableData>
            {
            res.product.status  == "available" ? <span className='success text-smaller raised padding-5 width-80 block  text-center round-edge'> Availble </span>
          : <span className='error text-smaller raised padding-5 width-80 block  text-center round-edge'>Not Availble </span>
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
