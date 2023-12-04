'use client'
import { HiUsers } from "react-icons/hi"; 
import { AiFillAppstore, AiFillMoneyCollect } from "react-icons/ai"; 
import { FaStoreAlt } from "react-icons/fa"; 
import { SiGoogleanalytics } from "react-icons/si"; 
import { IoMdLogOut } from "react-icons/io"; 
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Button from 'funuicss/ui/button/Button'
import AppBar from 'funuicss/ui/appbar/AppBar'
import Text from 'funuicss/ui/text/Text'
import RowFlex from 'funuicss/ui/specials/RowFlex'
import Section from 'funuicss/ui/specials/Section'
import Image from 'next/image'
import List from 'funuicss/ui/list/List'
import ListItem from 'funuicss/ui/list/Item'
import Div from "funuicss/ui/div/Div"
import DropDown from 'funuicss/ui/drop/Down'
import DropItem from 'funuicss/ui/drop/Item'
import DropMenu from 'funuicss/ui/drop/Menu'
import { PiCaretDown, PiUser } from "react-icons/pi";
import { GetToken, SignOut } from "@/default/Functions";
import Circle from "funuicss/ui/specials/Circle";

export default function NavBar({active}) {
  const [user, setuser] = useState("")
  const [isAdmin, setisAdmin] = useState(false)
  useEffect(() => {
   GetToken()
   .then( res => {
    setuser(res.user)
    setisAdmin( res.user.role == "admin" ? true  : false)
   } )
  }, [])
  
  if(user){
    return (
      <div>
      <div className='padding-20'>
            <AppBar
            fixedTop
            funcss="card transparent height-70"
          left = {
           <Circle size={3.5} bg="dark800">
            <Image src="/logo.png" width={50} height={50}/>
           </Circle>
          }
      
          right={
            <>
              <DropDown>
                  <Button funcss="borderless"  text={user.username} startIcon={<PiUser />} endIcon={<PiCaretDown />} />
                <DropMenu 
                animation="ScaleUp" 
                hoverable="hoverable" 
                duration={0.2}>
                    <DropItem>
               
                    </DropItem>
                    {/* <DropItem>Item Two</DropItem>
                    <DropItem>Item Three</DropItem> */}
                </DropMenu>
               </DropDown>
              {/* <Button
              fullWidth 
       text="Log Out" small  raised bg="error200" funcss='text-error900' endIcon={<IoMdLogOut />}  /> */}
            </>
          }
          />
        </div>
      
        <div className="_sidebar">
        
      <List gap={0.2}>
      
  {
    isAdmin &&
    <ListItem>
    <Link href="/dashboard">
        <Button
        fullWidth 
        funcss={`_sidelink ${active == 0 ? "card" : ''}`}
        text="Dashboard"
        startIcon={
        <Div width="25px" height="25px" funcss="central roundEdgeSmall  dark800">
            <SiGoogleanalytics className="text-primary" />
        </Div>}
        />
    </Link>
</ListItem>
  }
      <ListItem>
          <Link href="/store">
              <Button
              fullWidth 
              funcss={`_sidelink ${active == 1 ? "card" : ''}`}
              text="Store"
              startIcon={
              <Div width="25px" height="25px" funcss="central roundEdgeSmall  dark800">
                  <FaStoreAlt className="text-primary" />
              </Div>}
              />
          </Link>
      </ListItem>
      {
        isAdmin &&
        <ListItem>
        <Link href="/products">
            <Button
            fullWidth 
            funcss={`_sidelink ${active == 2 ? "card" : ''}`}
            text="Products"
            startIcon={
            <Div width="25px" height="25px" funcss="central roundEdgeSmall  dark800">
                <AiFillAppstore className="text-primary" />
            </Div>}
            />
        </Link>
    </ListItem>
      }
      <ListItem>
          <Link href="/installments">
              <Button
              fullWidth 
              funcss={`_sidelink ${active == 3 ? "card" : ''}`}
              text="Installments"
              startIcon={
              <Div width="25px" height="25px" funcss="central roundEdgeSmall  dark800">
                  <AiFillMoneyCollect className="text-primary" />
              </Div>}
              />
          </Link>
      </ListItem>
      <ListItem>
          <Link href="/staff">
              <Button
              fullWidth 
              funcss={`_sidelink ${active == 4 ? "card" : ''}`}
              text="Staff"
              startIcon={
              <Div width="25px" height="25px" funcss="central roundEdgeSmall  dark800">
                  <HiUsers className="text-primary" />
              </Div>}
              />
          </Link>
      </ListItem>
      
      
      </List>

      <Section gap={4}/>

      <Button
      fullWidth 
       text="Log Out"   
       raised 
       bg="error" 
       funcss='text-bold' 
       onClick={() => SignOut()}
       rounded
       />

        </div>
      </div>
         
        )
  }else {
    return ""
  }
}
