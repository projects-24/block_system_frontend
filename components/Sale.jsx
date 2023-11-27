import React from 'react'
import Modal from 'funuicss/ui/modal/Modal'
import CloseModal from 'funuicss/ui/modal/Close'
import Button from 'funuicss/ui/button/Button'
import RowFlex from 'funuicss/ui/specials/RowFlex'
import Section from 'funuicss/ui/specials/Section'
import Text from 'funuicss/ui/text/Text'
import Input from 'funuicss/ui/input/Input'
import { PiCheck , PiX } from 'react-icons/pi'
import Table from 'funuicss/ui/table/Table'
import TableData from 'funuicss/ui/table/Data'
import TableRow from 'funuicss/ui/table/Row'

export default function SaleModal() {

    const doc = {
        "_id": "6563d99e52be47f92e528d5d",
        "products": [
          {
            "_id": "6547b9714f3b3e0294168e77",
            "product": {
              "name": "Chips and Bricks",
              "price": "15",
              "description": "These are good for building door to door bricks",
              "status": "available"
            },
            "price": 100,
            "number": "BLK-000",
            "quantity": 3
          },
          {
            "_id": "6547b9944f3b3e0294168e78",
            "product": {
              "name": "bill block two",
              "price": "332",
              "description": "this is a four by four bloc",
              "status": "available"
            },
            "price": 100,
            "number": "BLK-001",
            "quantity": 2
          }
        ],
        "customer": {
          "full_name": "Iddris Abdul Wahab",
          "contact": "039383",
          "address": "Wa zongo"
        },
        "staff": {
          "_id": "6545b611fc41881f513a0770",
          "username": "Iddris Abdul Wahab",
          "contact": "05525537",
          "address": "Wa",
          "role": "admin"
        },
        "analytics": {
          "date": "2023-11-26",
          "date_analytics": 20231126,
          "time": "23:49:50",
          "day": 26,
          "month": 11,
          "month_fig": "Nov",
          "year": 2023,
          "hour": 23
        },
        "total_price": 500,
        "total_quantity": 5,
        "payment": {
          "total_amount": 500,
          "amount_payed": 100,
          "method": "installment",
          "history": [
            {
              "amount": 100,
              "analytics": {
                "date": "2023-11-26",
                "date_analytics": 20231126,
                "time": "23:49:50",
                "day": 26,
                "month": 11,
                "month_fig": "Nov",
                "year": 2023,
                "hour": 23
              }
            }
          ]
        },
        "payment_method": "installment"
      }
  return (
    <div>
    <Button 
    text="Login Account"
     bg="gradient" 
     onClick={()=> setmodal2(true)} />
    <Modal 
    id='modal2'
    animation="ScaleUp" 
    duration={0.4} 
    open={true}
    funcss='flat'
    maxWidth="900px"
    close={<CloseModal onClick={() => setmodal2(false)} />}
    title={
        <div className='container '>
            <Text text={`👋 ${doc.customer.full_name}`}  heading="h5"/>
           <div> <Text text={doc.payment.method} bold color="primary" /></div>
        </div>
    }
    body={
        <div className='container'>

            <Section  gap={2}>
            <Text text="Products" funcss="margin-bottom-10" block size="small" bold color="primary"/>
            <Table 
       funcss='text-smaller text-bold'
       hoverable
       stripped
       head={<>
    <TableData>Name</TableData>
         <TableData>No</TableData>
         <TableData>Quantity</TableData>
         <TableData>Total price</TableData>
       </>}
       body={
           <>
           {
            doc &&
            doc.products.map( res => (
                <TableRow>
         <TableData>{res.product.name}</TableData>
         <TableData>{res.number}</TableData>
         <TableData>{res.quantity}</TableData>
         <TableData>{res.price}</TableData>
       </TableRow>
            ))
           }
   
           </>
       }
       >


 </Table>

            </Section>

            <Text text="Customer" funcss="margin-bottom-10" block size="small" bold color="primary"/>
            <div className='section dark900 padding-20 roundEdge text-dark'>
                <RowFlex gap={2} justify="space-between">
                    <div>
                    <Text text="Fullname" emp funcss="margin-bottom-10" block size="small" bold color="primary"/>
                     <Text 
                     text={doc.customer.full_name}
                     />
                    </div>
                    <div>
                    <Text text="Address" emp funcss="margin-bottom-10" block size="small" bold color="primary"/>
                     <Text 
                     text={doc.customer.address}
                     />
                    </div>
                    <div>
                    <Text text="Contact" emp funcss="margin-bottom-10" block size="small" bold color="primary"/>
                     <Text 
                     text={doc.customer.contact}
                     />
                    </div>
                </RowFlex>
            </div>
            <Section  gap={2}/>
            <Text text="Sold By" funcss="margin-bottom-10" block size="small" bold color="primary"/>
            <div className='section dark900 padding-20 roundEdge text-dark'>
            <div>
                    <Text text="Fullname" emp funcss="margin-bottom-10" block size="small" bold color="primary"/>
                     <Text 
                     text={doc.staff.username}
                     />
                    </div>
            </div>

            <Section  gap={2}/>
            <Text text="Payments History" funcss="margin-bottom-10" block size="small" bold color="primary"/>
            <div className='section dark900 padding-20 roundEdge text-dark'>
            <Table 
       funcss='text-smaller text-bold'
       hoverable
       stripped
       head={<>
    <TableData>Amount</TableData>
         <TableData>Date</TableData>
         <TableData>Time</TableData>
       </>}
       body={
           <>
           {
            doc &&
            doc.payment.history.map( res => (
                <TableRow>
         <TableData>{res.amount}</TableData>
         <TableData>{res.analytics.date}</TableData>
         <TableData>{res.analytics.time}</TableData>
       </TableRow>
            ))
           }
   
           </>
       }
       >


 </Table>
            </div>

            <Section  gap={2}/>
    <Text text="Amount (GHC)" funcss="margin-bottom-10" block size="small" bold color="primary"/>
    <Input bordered fullWidth  />
    <Section  gap={2}/>
        </div>
    }
    footer={
    <div className='container'>
    <RowFlex gap={1} justify='flex-end'>
            {/* <Button
            text='Cancel'
            color='error'
            funcss='text-bold'
            startIcon={<PiX />}
            onClick={() => setmodal2(false) }
            /> */}
            <Button
            text='Pay'
            bg='primary'
            raised
            color='text-bold'
            startIcon={<PiCheck />}
            onClick={() => setmodal2(false) }
            />
        </RowFlex>
    </div>}
    />
    </div>
  )
}
