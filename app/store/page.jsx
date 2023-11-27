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
import { PiCheck, PiPen, PiPlus, PiStorefront, PiTag, PiTrash, PiX } from 'react-icons/pi'
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
  let [sell_doc, setsell_doc] = useState([])
  const [modal, setmodal] = useState(false)
  const [modal2, setmodal2] = useState(false)
  const [delete_doc, setdelete_doc] = useState("")
  let [cart, setcart] = useState([])

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
    GetRequest("/available/products")
    .then(res => {
      setloading(false)

      if(res.status == "ok"){
        let store_products = res.data
        // Function to add the "quantity" field to each product
function addQuantityToProducts(store_products) {
  for (const product of store_products) {
    // You can set the quantity to any value you desire, for example, 1.
    product.product.quantity = 1;
  }
}

// Call the function to add the "quantity" field
addQuantityToProducts(store_products);

setdocs(store_products)


      }else{
        seterr(res.message)
      }
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

      if(sell_doc){
     
      Axios.patch(EndPoint + "/update/product/" + sell_doc._id, doc)
      .then( res => {
        setsell_doc("")
        setloading(false)
        if(res.data.status == "ok"){
          setdocs("")
        }else{
          seterr(res.data.message)
        }
      })
      .catch( err => {
        setsell_doc("")
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
        text={`Delete ${delete_doc != [] ? delete_doc.product.name : ''}`}
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
maxWidth="800px"
title={<Text text={ "Cart"} heading='h4' funcss='padding' block/>}
body={
<div>
    <div>
    {
        sell_doc && 
        <Table 
       funcss='text-small'
       stripped
       head={<>
    <TableData>Product</TableData>
         <TableData>Price</TableData>
         <TableData>Quantity</TableData>
       </>}
       body={
           <>
          { 
                sell_doc &&
                sell_doc.map(doc => (
                    <TableRow>
                      <TableData>{doc.product.name}</TableData>
                      <TableData>{doc.price}</TableData>
                      <TableData>
                        <Input 
                        type='number' 
                        defaultValue={doc.product.quantity} 
                        label='Quantity' 
                        bordered
                        onChange={(e) => {
                          let quantity = e.target.value
                         // Function to update the quantity value based on _id
function updateQuantityById(_id, newQuantity) {
  const productToUpdate = sell_doc.find(product => product._id === _id);

  if (productToUpdate) {
    // Update the quantity value
    productToUpdate.product.quantity = newQuantity;
  } else {
    console.log(`Product with _id ${_id} not found.`);
  }
}

// Example: Update quantity for a specific product
updateQuantityById(doc._id, quantity);
                       
                        }}
                        />
                      </TableData>
                     
                  </TableRow>
                    ) )
          }
           </>
       }
       >


 </Table>
     }
    </div>         
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
text="Check Out"
startIcon={<PiCheck />}
rounded
onClick={()=> Submit()}
/>
 </RowFlex>
}
/>
      
      {err && <ErrorAlert message={err} />}

        <NavBar active={1} />
        <Content>
            <Header 
            title={"Store"} 
            sub_title={"Sell products"}
            sub_dir={"Dashboard"}
            sub_dir_route={"/dashboard"}
            />
            {
              docs &&
              <RowFlex gap={1} justify='space-between'>
       <Col>
       <Multiselect
options={docs} // Options to display in the dropdown
// selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
onSelect={(selectedList, selectedItem) => setsell_doc(selectedList)} // Function will trigger on select event
// onRemove={this.onRemove} // Function will trigger on remove event
displayValue="number" // Property name to display in the dropdown options
/>
       </Col>
       <Col>
          <Button
          bg='primary'
          raised
          funcss='text-bold'
          startIcon={<PiStorefront size={20} />}
          text={`${sell_doc ? sell_doc.length : ''} View Cart`}
          onClick={() => {
          setmodal(true)
          } }
          />
               </Col>
              </RowFlex>
          
            }
           
        </Content>
    </div>
  )
}
