import React from 'react'
import Div from 'funuicss/ui/div/Div'
import Section from 'funuicss/ui/specials/Section'
import Text from 'funuicss/ui/text/Text'
import Button from 'funuicss/ui/button/Button'
import Input from 'funuicss/ui/input/Input'
import  FullCenteredPage from 'funuicss/ui/specials/FullCenteredPage';
import { PiPaperPlaneRight , PiKey, PiCheck } from 'react-icons/pi';
import IconicInput from 'funuicss/ui/input/Iconic'
import Link from 'next/link'
export default function App() {

return (

<div>
<FullCenteredPage>
<div className='width-300-max fit'>
<div className="margin-bottom-40">
<Text
   text='Welcome'
   heading='h2'
   block
   />
   <Text
   text='Sign in to continue!'
   block
   />
</div>
<Section gap={1.5}>
   <Text text="Email" funcss="margin-bottom-10"  block size="small" bold color="primary"/>
<IconicInput 
   leftIcon={ <PiPaperPlaneRight />}
   input={<Input type="email" fullWidth bordered />}
    />
</Section>
<Section gap={1}>
   <Text text="Password" funcss="margin-bottom-10"  block size="small" bold color="primary"/>
<IconicInput 
   leftIcon={  <PiKey />}
   input={<Input type="password" fullWidth bordered />}
    />
</Section>

     <div className="section">
       <Link href={"/#"}>
           <Text text='Forgot password!' size='small' underline color='primary'/>
       </Link>
</div>
     <div className="section">
       <Button
       text={"Let's go"}
       raised
       fullWidth
       bg='primary800'
       />
</div>

   </div>
</FullCenteredPage>
</div>

)
}

