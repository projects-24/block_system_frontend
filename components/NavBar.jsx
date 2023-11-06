import { HiUsers } from "react-icons/hi"; 
import { AiFillAppstore } from "react-icons/ai"; 
import { FaStoreAlt } from "react-icons/fa"; 
import { SiGoogleanalytics } from "react-icons/si"; 
import { IoMdLogOut } from "react-icons/io"; 
import React from 'react'
import Link from 'next/link'
import Button from 'funuicss/ui/button/Button'
import AppBar from 'funuicss/ui/appbar/AppBar'
import Text from 'funuicss/ui/text/Text'
import RowFlex from 'funuicss/ui/specials/RowFlex'
import Image from 'next/image'
import List from 'funuicss/ui/list/List'
import ListItem from 'funuicss/ui/list/Item'
import Div from "funuicss/ui/div/Div"
export default function NavBar({active}) {
  return (
<div>
<div className='padding-20'>
      <AppBar
    left = {
     <Image src="/logo.png" width={60} height={60}/>
    }

    right={
      <>
        <Button
        fullWidth 
 text="Log Out" small  raised bg="error200" funcss='text-error900' endIcon={<IoMdLogOut />}  />
      </>
    }
    />
  </div>

  <div className="_sidebar">
<List gap={0.2}>

<ListItem>
    <Link href="#">
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
<ListItem>
    <Link href="#">
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
<ListItem>
    <Link href="#">
        <Button
        fullWidth 
        funcss={`_sidelink ${active == 1 ? "card" : ''}`}
        text="Products"
        startIcon={
        <Div width="25px" height="25px" funcss="central roundEdgeSmall  dark800">
            <AiFillAppstore className="text-primary" />
        </Div>}
        />
    </Link>
</ListItem>
<ListItem>
    <Link href="#">
        <Button
        fullWidth 
        funcss={`_sidelink ${active == 1 ? "card" : ''}`}
        text="Staff"
        startIcon={
        <Div width="25px" height="25px" funcss="central roundEdgeSmall  dark800">
            <HiUsers className="text-primary" />
        </Div>}
        />
    </Link>
</ListItem>


</List>
  </div>
</div>
   
  )
}
