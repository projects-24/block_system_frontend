'use client'
import Content from '@/components/Content'
import NavBar from '@/components/NavBar'
import React from 'react'
import Card from 'funuicss/ui/card/Card'
import Table from 'funuicss/ui/table/Table'
import TableData from 'funuicss/ui/table/Data'
import TableRow from 'funuicss/ui/table/Row'
import Header from '@/components/Header'

export default function Staffs() {
  return (
    <div>
        <NavBar active={4} />
        <Content>
            <Header 
            title={"Staffs"} 
            sub_title={"create and manage staffs"}
            sub_dir={"Dashboard"}
            sub_dir_route={"/dashboard"}
            />
            <Card
            header={<>
            
            </>}
            >
            <Table 
       funcss='text-small'
       hoverable
       stripped
       head={<>
    <TableData>Fullname</TableData>
         <TableData>Role</TableData>
         <TableData>Contact</TableData>
         <TableData>Address</TableData>
       </>}
       body={
           <>
              <TableRow>
         <TableData>Introduction to React</TableData>
         <TableData>John Doe</TableData>
         <TableData>50</TableData>
         <TableData>4.8</TableData>
       </TableRow>
       <TableRow>
         <TableData>JavaScript Fundamentals</TableData>
         <TableData>Jane Smith</TableData>
         <TableData>35</TableData>
         <TableData>4.5</TableData>
       </TableRow>
       <TableRow>
         <TableData>Web Development Basics</TableData>
         <TableData>Mike Johnson</TableData>
         <TableData>45</TableData>
         <TableData>4.7</TableData>
       </TableRow>
       <TableRow>
         <TableData>Advanced CSS Techniques</TableData>
         <TableData>Sarah Williams</TableData>
         <TableData>30</TableData>
         <TableData>4.9</TableData>
       </TableRow>
       <TableRow>
         <TableData>Node.js for Beginners</TableData>
         <TableData>David Brown</TableData>
         <TableData>25</TableData>
         <TableData>4.6</TableData>
       </TableRow>
           </>
       }
       >


 </Table>
            </Card>
        </Content>
    </div>
  )
}
