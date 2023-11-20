'use client'
import { HiOutlineUsers } from "react-icons/hi"; 
import { GiReceiveMoney } from "react-icons/gi"; 
import React, { useState } from 'react'
import NavBar from './../../components/NavBar';
import Content from './../../components/Content';
import Div from 'funuicss/ui/div/Div'
import Text from 'funuicss/ui/text/Text'
import Grid from 'funuicss/ui/grid/Grid'
import Col from 'funuicss/ui/grid/Col'
import Card from 'funuicss/ui/card/Card'
import RowFlex from 'funuicss/ui/specials/RowFlex'
import {PiArrowDown, PiArrowUp, PiCursorClickDuotone,  PiUsersDuotone,  PiVoicemailDuotone} from 'react-icons/pi'
import Button from 'funuicss/ui/button/Button'
import Input from 'funuicss/ui/input/Input'
export default function Dashboard() {

    const [query_type, setquery_type] = useState("")
  return (
    <div>
        <NavBar active={0}/>
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
                                        /> 
                                        </div>
                                        : ''
                                    }
                                    {
                                        query_type == 'yearly' ?
                                        <div>
                                              <Text text="Year *" funcss="margin-bottom-10"  block size="small" bold color="primary"/>
                                             <Input 
                                        type="month" 
                                        bordered 
                                        rounded
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
                                        /> 
                                        </div>
                                        </RowFlex>
                                        : ''
                                    }
                                </div>
                                <div>
                                <Text text="Search" funcss="margin-bottom-10"  block size="small" bold color="primary"/>
                                <Button raised bg={"primary"} rounded  text={"Query"} funcss="width-100"/> 
                                </div>
                            </RowFlex>
                        </div>
                    </RowFlex>
                </Card>
            </Div>
        <Div funcss='padding'>
<Text
text='Last 30 days'
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
           <Text text='Total Sales' size='small' color='dark400' block bold/>
           <RowFlex gap={0.5}>
           <Text heading='h3' text='20,000' color='dark200' />
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
           <Text heading='h3' text='600.00' color='dark200' />
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
           <Text heading='h3' text='20,000' color='dark200' />
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
        </Content>
    </div>
  )
}
