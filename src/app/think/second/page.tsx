import CheckInput from '@/components/think/component'
import React from 'react'

type Props = {
  params: {
    id: number | string
  }
}




function ThinkDetailPage() {

  
  return (
    <div className='items-center'>
      <h1>Welcome to the second phase. </h1>
      <p>
         Now add the number that you choose using below formula <br/>
        <small>For example: If you choose number less than 9 added it as (0 + 5 [ your choosing number]) </small> <br />
        <small> If you choose number greater than 9 added it as (first number and second number) 49 choosing number ( 4 + 9) = 13 </small><br />
        <small> Again If your number greater than 9 added it as (first number and second number) 13 choosing number ( 1 + 3) = 4 </small>
        {/* <small> And subtract the summed number form your choosing number (49 - 13)  </small> */}
      </p>
      
      <CheckInput />
      </div>
  )
}

export default ThinkDetailPage
