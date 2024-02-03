import React from 'react'
import Alert from 'funuicss/ui/alert/Alert'
export default function ErrorAlert({message}) {
  return <Alert message={message} type="danger" fixed='top-right' />

}
