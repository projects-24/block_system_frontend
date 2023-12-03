'use client'
import { HiOutlineUsers } from "react-icons/hi"; 
import { GiReceiveMoney } from "react-icons/gi"; 
import React, { useEffect, useState } from 'react'
import NavBar from './../../components/NavBar';
import Content from './../../components/Content';
import Div from 'funuicss/ui/div/Div'
import Text from 'funuicss/ui/text/Text'
import Grid from 'funuicss/ui/grid/Grid'
import Col from 'funuicss/ui/grid/Col'
import Card from 'funuicss/ui/card/Card'
import RowFlex from 'funuicss/ui/specials/RowFlex'
import {PiArrowDown, PiArrowUp, PiCursorClickDuotone,  PiEye,  PiMoney,  PiPrinter,  PiUsersDuotone,  PiVoicemailDuotone} from 'react-icons/pi'
import Button from 'funuicss/ui/button/Button'
import Input from 'funuicss/ui/input/Input'
import Axios from "axios";
import {EndPoint} from "../../default/Functions"
import Alert from "funuicss/ui/alert/Alert"
import Loader from "@/components/Loader"
import Table from 'funuicss/ui/table/Table'
import TableData from 'funuicss/ui/table/Data'
import TableRow from 'funuicss/ui/table/Row'
import Section from "funuicss/ui/specials/Section";
import SaleModal from '@/components/Sale'
import CloseModal from 'funuicss/ui/modal/Close'

export default function Dashboard() {

    const [query_type, setquery_type] = useState("")
    const [filter, setfilter] = useState("")
    const [docs, setdocs] = useState("")
    const [err, seterr] = useState("")
    const [loading, setloading] = useState(false)
    const [monthly, setmonthly] = useState("")
    const [yearly, setyearly] = useState("")
    const [start_interval, setstart_interval] = useState("")
    const [end_interval, setend_interval] = useState("")
    const [daily, setdaily] = useState("")
    const [installmentModal, setinstallmentModal] = useState(false)
    const [doc, setdoc] = useState("")
    const [modal_type, setmodal_type] = useState("")
    

    useEffect(() => {
        setTimeout(() => {
          seterr(false)
        }, 5000);
      
        return clearTimeout()
        }, [err])

    const GetData = (route) => {
        setloading(true)
        Axios.get(EndPoint + route)
        .then(doc => {
            setloading(false)
            console.log(doc.data)
            if(doc.data.status == "ok"){
                setdocs(doc.data)
            }else{
                seterr(doc.data.message)
            }
        })
        .catch(err => {
         seterr(err.message)
         setloading(false)   
        })
    }

    const HandleQuery = () => {
        if(query_type == "today"){
         GetData("/today/sales")
        }else if(query_type == "this month"){
            GetData("/monthly/current")
        }else if(query_type == "interval"){
           if(start_interval && end_interval){
            GetData(`/analytics/interval/${start_interval.split("-").reverse().join("-")}/${end_interval.split("-").reverse().join("-")}`)
           }else{
            seterr("Make sure to enter the start and end date")
           }
        }else if(query_type == "daily"){
          if(daily){
            GetData(`/daily/sales/${daily}`)
          }else{
            seterr("Select the specific date")
          }
        }else if(query_type == "monthly"){
           let month_and_year = monthly 
           let _year = month_and_year.slice(0 , month_and_year.indexOf("-"))
           let _month = month_and_year.slice(-2)
           GetData(`/monthly/${parseInt(_month)}/${parseInt(_year)}`)
        
        }else if(query_type == "yearly"){
            if(yearly.toString().length != 4){
                seterr("Make sure to enter a valid year")
            }else{
                GetData(`/yearly/${yearly}`)
            }
        }
    }
  return (
    <div>
        <NavBar active={0}/>
        {loading && <Loader />}
        <SaleModal 
      close={<CloseModal onClick={() => setinstallmentModal(false)} />}
      open={installmentModal}
      doc={doc}
      />
        {
   err &&
   <Alert message={err} raised type="warning" fixed="top-right"/>
}

        <Content>
            <Div funcss="padding margin-bottom-20">
                <Card funcss="padding-20" roundEdge>
                    <RowFlex gap={1} justify="space-between">
                        <div>
                        <Text text="Query Type *" funcss="margin-bottom-10" block size="small" bold color="primary"/>
                    <Input 
                    onChange={(e) => setquery_type(e.target.value) }
    type="text" 
    label="Query Type" 
    bordered
    select
    rounded
    options={[
     {
         value:"",
         text:"-- Select Query Type --"
     },
     {
         value:"today",
         text:"Today"
     },
     {
         value:"this month",
         text:"This Month"
     },
     {
         value:"daily",
         text:"Daily"
     },
     {
         value:"monthly",
         text:"Monthly"
     }
     ,
     {
         value:"yearly",
         text:"Yearly"
     }
     ,
     {
         value:"interval",
         text:"Interval"
     }
    ]}
    />
                        </div>

                        <div>
                            <RowFlex gap={1}>
                                <div>

                                    {
                                        query_type == 'daily' ?
                                        <div>
                                              <Text text="Select date *" funcss="margin-bottom-10"  block size="small" bold color="primary"/>
                                             <Input 
                                        type="date" 
                                        bordered 
                                        rounded
                                        onChange={(e) => setdaily(e.target.value) }
                                        /> 
                                        </div>
                                        : ''
                                    }
                                    {
                                        query_type == 'monthly' ?
                                        <div>
                                              <Text text="Month & Year *" funcss="margin-bottom-10"  block size="small" bold color="primary"/>
                                             <Input 
                                        type="month" 
                                        bordered 
                                        rounded
                                        onChange={(e) => setmonthly(e.target.value) }
                                        /> 
                                        </div>
                                        : ''
                                    }
                                    {
                                        query_type == 'yearly' ?
                                        <div>
                                              <Text text="Year *" funcss="margin-bottom-10"  block size="small" bold color="primary"/>
                                             <Input 
                                        type="number" 
                                        bordered 
                                        rounded 
                                        onChange={(e) => setyearly(e.target.value) }
                                        /> 
                                        </div>
                                        : ''
                                    }
                                    {
                                        query_type == 'interval' ?
                                        <RowFlex gap={0.5}>
                                            <div>
                                              <Text text="From *" funcss="margin-bottom-10"  block size="small" bold color="primary"/>
                                             <Input 
                                        type="date" 
                                        onChange={(e) => setstart_interval(e.target.value)}
                                        bordered 
                                        rounded
                                        /> 
                                        </div>
                                            <div>
                                              <Text text="To *" funcss="margin-bottom-10"  block size="small" bold color="primary"/>
                                             <Input 
                                        type="date" 
                                        bordered 
                                        rounded
                                        onChange={(e) => setend_interval(e.target.value)}
                                        /> 
                                        </div>
                                        </RowFlex>
                                        : ''
                                    }
                                </div>
                                <div>
                                <Text text="Search" funcss="margin-bottom-10"  block size="small" bold color="primary"/>
                                <Button onClick={HandleQuery} raised bg={"primary"} rounded  text={"Query"} funcss="width-100"/> 
                                </div>
                            </RowFlex>
                        </div>
                    </RowFlex>
                </Card>
            </Div>
        <Div funcss='padding'>
<Text
text={query_type ? query_type : ""}
bold
/>
</Div>
<Grid>
   <Col sm={12} md={4} lg={4} funcss='padding'>
       <Card
       funcss=' round-edge hover-up'
       body={
           <RowFlex gap={1} funcss='padding-20'>
           <Button text={<PiUsersDuotone size={20} />} bg='primary' raised height="3rem" width='3rem' />
           <Div>
           <Text text='Total Quantity ' size='small' color='dark400' block bold/>
           <RowFlex gap={0.5}>
           <Text heading='h3' text={docs ? docs.overall_quantity : "..."} color='dark200' />
           <Button 
           startIcon={<PiArrowUp />}
           color='success'
           text='223'
           />
           </RowFlex>
           </Div>
           </RowFlex>
       }

       />
   </Col>
   <Col sm={12} md={4} lg={4} funcss='padding'>
       <Card
       funcss=' round-edge hover-up'
       body={
           <RowFlex gap={1} funcss='padding-20'>
           <Button text={<GiReceiveMoney size={20} />} bg='primary' raised height="3rem" width='3rem' />
           <Div>
           <Text text='Revenue (GHC)' size='small' color='dark400' block bold/>
           <RowFlex gap={0.5}>
           <Text heading='h3' text={docs ? docs.overall_price : "..."} color='dark200' />
           <Button 
           startIcon={<PiArrowUp />}
           color='success'
           text='20%'
           />
           </RowFlex>
           </Div>
           </RowFlex>
       }
 
       />
   </Col>
   <Col sm={12} md={4} lg={4} funcss='padding'>
       <Card
       funcss=' round-edge hover-up'
       body={
           <RowFlex gap={1} funcss='padding-20'>
           <Button text={<HiOutlineUsers size={20} />} bg='primary' raised height="3rem" width='3rem' />
           <Div>
           <Text text='Total Customers' size='small' color='dark400' block bold/>
           <RowFlex gap={0.5}>
           <Text heading='h3' text={docs ? docs.length : "..."} color='dark200' />
           <Button 
           startIcon={<PiArrowDown />}
           color='error'
           text='0.38%'
           />
           </RowFlex>
           </Div>
           </RowFlex>
       }
  
       />
   </Col>

</Grid>


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
           <TableData>Customer </TableData>
         <TableData>Price </TableData>
         <TableData>Quantity </TableData>
         <TableData>Contact</TableData>
         <TableData>Method</TableData>
         <TableData>Sold By</TableData>
         <TableData>Date</TableData>
         <TableData>Time</TableData>
         <TableData>View</TableData>
       </>}
       body={
           <>
           {
            docs && 
            docs.data
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
                {
                res.payment.method == "cash" ? 
                <Button
                text="Cash"
                startIcon={<PiMoney />}
                smaller
                bg="success"
                />:    <Button
                text="Installment"
                smaller
                bg="dark"
                />
                    
                }
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
