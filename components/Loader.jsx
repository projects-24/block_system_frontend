import React from 'react'
import FunLoader from 'funuicss/ui/loader/Loader'

export default function Loader() {
  return (
    <div><FunLoader
    size="80px"
    color={"primary"}
    variant='circle'
    fixed
    /></div>
  )
}
