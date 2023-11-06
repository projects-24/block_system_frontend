import { HiOutlineUsers } from "react-icons/hi"; 
import { GiReceiveMoney } from "react-icons/gi"; 
import React from 'react'
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

export default function Dashboard() {
  return (
    <div>
        <NavBar active={0}/>
        <Content>
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
