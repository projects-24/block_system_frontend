import React from 'react'
import Button from 'funuicss/ui/button/Button'
import RowFlex from 'funuicss/ui/specials/RowFlex'
import BreadCrumb from 'funuicss/ui/breadcrumb/BreadCrumb'
import { PiCheck, PiHouse } from 'react-icons/pi'
import Text from 'funuicss/ui/text/Text'
import Link from 'next/link'
import Card from "funuicss/ui/card/Card"
export default function Header({title , sub_title , sub_dir , sub_dir_route}) {
  return (
    <p className=' text-dark300 margin-bottom-40'>
      <Card xl funcss="roundEdge padding-20">
        <div>
        <div className='margin-bottom-20'>
      <RowFlex alignItems='center'>
      <Link href="#" legacyBehavior>
<Button rounded bg="light400" startIcon={<PiHouse />} smaller>
Home
</Button>
</Link>
{
  sub_dir &&
  <>
  <BreadCrumb type={"greater"} />
      <Link href={sub_dir_route} legacyBehavior>
<Button rounded bg="light500" raised startIcon={<PiHouse />} smaller>
{sub_dir}
</Button>
</Link>
  </>
}
<BreadCrumb type={"greater"} />
<Link href="#" legacyBehavior>
<Button rounded bg="gradient" raised startIcon={<PiCheck />} smaller>
{title.slice(0 ,30)}
</Button>
</Link>
      </RowFlex>
    </div>
  <div>
  <Text
    text={title}
    heading='h2'
    bold
    color="dark200"
    />
    <div />
    <Text
    text={sub_title}
    article
    />
  </div>
        </div>
      </Card>
</p>
  )
}