'use client';
import React from 'react'

import Link from 'next/link';
import { deleteCookie, getCookie, setCookie } from '@/utils/cookie';
import { arrayToStringCOnversion } from '@/utils/string';

type Props = {
  [key:number]: string | number | null
}

const fakeData = [
  {0:1, 1:2, 2:null, 3:4, 4:56, 5:34, 6:23, 7:67, 8:34, 9:4, 10:11, 11:null, 12:34, 13:56, 14:33, 15:23},
  {0:6, 1:3, 2:5, 3:41, 4:6, 5:7, 6:18, 7:null, 8:null, 9:3, 10:19, 11:17, 12:14, 13:6, 14:3, 15:78},
  {0:10, 1:24, 2:25, 3:8, 4:11, 5:19, 6:21, 7:44, 8:null, 9:9, 10:19, 11:10, 12:18, 13:5, 14:30, 15:5},
  {0:9, 1:24, 2:25, 3:7, 4:18, 5:20, 6:83, 7:47, 8:34, 9:17, 10:20, 11:9, 12:4, 13:6, 14:13, 15:null}
]

const Bingo = () => {
  const [numbers, setNumbers] = React.useState('');
  const [arrayNumbers, setArrayNumbers] = React.useState<Array<Props>>([]); //fakeData

  const [selectedNumber, setSelectedNumber] = React.useState<number>();
  const [existingNumber, setExistingNumber] = React.useState<Array<number>>([]);


  React.useEffect(() => {
    const cookieNumbers = getCookie('arr_num');
    console.log('cookie', cookieNumbers);
    
  }, [])
  
  React.useEffect(() => {
    setCookie(`existing_num`, JSON.stringify(existingNumber) ) 
  }, [existingNumber])

  React.useEffect(() => {
    setCookie(`existing_num`, JSON.stringify(arrayNumbers) ) 
  }, [arrayNumbers])
  

  const onMakeArrayChange = () => {
    if (numbers && numbers.length) {
      const _n = numbers.split(' ');
      setArrayNumbers(prev => [...prev, { ..._n }])
      // setTimeout(() => setCookie(`arr_num`, JSON.stringify(arrayNumbers) ) ,1000)
      setNumbers('')
    }
  }

  const onNumberSelected = () => {
    selectedNumber && setExistingNumber(prev => [...prev, selectedNumber])
  }

  const onRemovePrevious = () => {
    selectedNumber && setExistingNumber(prev => prev.filter(item => item !== selectedNumber))
  }

  const onReset = () => {
    deleteCookie('arr_num');
    deleteCookie('existing_num');
    window.location.reload();
  }
  
  return (
    <div className='p-10'>
      <span className='text-red-500'>Please go thru the link and upload the bingo images </span><br />
      <Link href="https://brandfolder.com/workbench/extract-text-from-image" className='text-blue-300'>Image To Text Convert</Link>
      <div className='mt-5'>
        <input name="meta_box" className="text-black mr-2 p-3 w-[30rem]"
          type="text" title="meta-box" value={numbers}
          placeholder='Paste the image text here'
          onChange={(e) => setNumbers(e.target.value)} />
        <button type="button" onClick={onMakeArrayChange} className="p-3  border-2 border-white-400">Add To Array</button>
      </div>
      
      <div className={`mt-3 ${arrayNumbers && arrayNumbers.length ? "visible" : "hidden"}`}>
        <label>Input selected Number</label><br/>
        <input name="selected_number" className="text-black mr-2 p-3 w-[30rem]" type="text" title="meta-box" value={selectedNumber} onChange={(e) => setSelectedNumber(+e.target.value)} />
        <button type="button"  onClick={onNumberSelected} className='p-3  border-2 border-white-400'>Search Number</button>
        <button type="button"  onClick={onRemovePrevious} className='p-3 ml-3 border-2 border-red-400 text-red-200'>Remove Previous Number</button>
      </div>
      <div className='mt-4'>
        <button type="button"  onClick={onReset} className='p-3 ml-3 border-2 border-red-400 text-red-200'>Reset</button>
      </div>
      

      <div className='flex m-2'>
        {arrayNumbers && arrayNumbers.length ? arrayNumbers.map((num, cnt) => {
          
          return (<div key={cnt} className=' border-teal-100 border mr-8 w-2/5'>
            <div className="grid grid-cols-9 gap-1 p-2 text-center">
              {Object.values(num).map((val, key) => {
                let selected = false;
              if (val !== null && existingNumber.includes(+val)) {
                selected = true;
              }
              
              
              return <div key={key} className={`border p-4 ${selected ? 'bg-green-500' : ''}`}>
                  <div>{ val}</div>
                  </div>
              
               
            })}
              </div>
          </div>)
        }) : null}
        </div>
    </div>
  )
}
export default Bingo;