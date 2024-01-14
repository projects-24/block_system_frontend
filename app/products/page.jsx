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
import Multiselect from 'multiselect-react-dropdown';
export default function Products() {
  const [err, seterr] = useState("")
  const [docs, setdocs] = useState('')
  const [loading, setloading] = useState(false)
  const [udoc, setudoc] = useState('')
  const [modal, setmodal] = useState(false)
  const [modal2, setmodal2] = useState(false)
  const [delete_doc, setdelete_doc] = useState("")
  const [inputs, setinputs] = useState([])
  const [all_inputs, setall_inputs] = useState("")
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
  
  useEffect(() => {
  if(!all_inputs){
    GetRequest("/inputs/in_stock")
    .then(res => {
      if(res.status == "ok"){
        let store_inputs = res.data
        // Function to add the "quantity" field to each product
function addQuantityToInputs(store_inputs) {
  for (const product of store_inputs) {
    // You can set the quantity to any value you desire, for example, 1.
    product.quantity = 1;
  }
}

// Call the function to add the "quantity" field
addQuantityToInputs(store_inputs);

setall_inputs(store_inputs)


      }else{
        seterr(res.message)
      }
    })
  }
  })
  
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
    let name, quantity , price, description
    name = FunGet.val("#name")
    price = FunGet.val("#price")
    description = FunGet.val("#description")
    quantity = FunGet.val("#quantity")
    status = FunGet.val("#status")

    const doc = {
      product:{
        name ,
        price,
        description ,
        status
      },
      price,
      staff:user ,
      inputs ,
      quantity
    }
    const update_doc = {
      product:{
        name ,
        price,
        description ,
        status
      },
      price,
      inputs ,
      quantity
    }
   
    if(
      name &&
      price &&
      description 
    ){
      setloading(true)
      setmodal(false)

      if(udoc){
      Axios.patch(EndPoint + "/update/product/" + udoc._id, update_doc)
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
    Axios.delete(EndPoint + "/delete/product/" + id)
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
animation="SlideRight" 
duration={0.4} 
open={modal}
position='left'
maxWidth="700px"
title={
  <div className='container'>
    <Text text={udoc ? udoc.product.name : "New Product"} heading='h4' funcss='padding' block/>
  </div>
}
body={
  <div className='container'>
      <Section gap={2} />
      
      <RowFlex gap={1}>
        <Col>
        <Text 
        text='Product Name*'
        size='small'
        color='primary'
        funcss="margin-bottom-10"
        block
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
        funcss="margin-bottom-10"
        block
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
        funcss="margin-bottom-10"
        block
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
   


{
  all_inputs && !udoc &&
<>
<Text 
  text='Inputs*'
  size='small'
  color='primary'
  funcss="margin-bottom-10"
  block
  bold
  />
  <Multiselect
options={all_inputs}
onSelect={(selectedList, selectedItem) =>  {
  new Promise((resolve, reject) => {
    setinputs([])
    resolve()
  })
  .then(() => setinputs(selectedList) )
}} 
displayValue="name" 
/>
</>
}
<Section gap={2}/>
{
        inputs && 
        <Table 
       funcss='text-small'
       stripped
       head={<>
    <TableData>Input</TableData>
         <TableData>Quantity</TableData>
         <TableData>Unit</TableData>
       </>}
       body={
           <>
          { 
                inputs &&
                inputs.map(doc => (
                    <TableRow key={doc._id}>
                      <TableData>{doc.name}</TableData>
                      <TableData>
                        <Input 
                        type='number' 
                        defaultValue={doc.quantity} 
                        label='Quantity' 
                        bordered
                        onChange={(e) => {
                          let quantity = e.target.value
                         // Function to update the quantity value based on _id
function updateQuantityById(_id, newQuantity) {
  const InputToUpdate = inputs.find(product => product._id === _id);

  if (InputToUpdate) {
    // Update the quantity value
    InputToUpdate.quantity = newQuantity;
  } else {
    console.log(`Product with _id ${_id} not found.`);
  }
}

// Example: Update quantity for a specific product
updateQuantityById(doc._id, quantity);
                       
                        }}
                        />
                      </TableData>
                      <TableData>{doc.measurement}</TableData>
                  </TableRow>
                    ) )
          }
           </>
       }
       >


 </Table>
     }
        </Col>
      <Section gap={2} />
      <RowFlex gap={1}>
      <Col>
        <Text 
        text='Availabilty*'
        size='small'
        color='primary'
        funcss="margin-bottom-10"
        block
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
        <Col>
        <Text 
        text='Quantity*'
        size='small'
        color='primary'
        funcss="margin-bottom-10"
        block
        bold
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

   

        <Section gap={2} />

         
</div>
}
footer={
<div className="container">
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
</div>
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
         <TableData>Quantity</TableData>
         <TableData>Status</TableData>
         <TableData>Threshold</TableData>
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
           <TableData>{res.quantity}</TableData>
           <TableData>
            {
            res.product.status  == "available" ? 
            <Circle bg="success" size={2}>
              <PiCheck />
            </Circle>
          :  <Circle bg="error" size={2}>
          <PiX />
        </Circle>
          }
          </TableData>
           <TableData>
            {
            res.quantity > config.products  ? 
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
              setinputs(res.inputs)
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
