'use client';
import React from 'react';

const rangeFormat = [
  {label:'1-10', value:'1-10'},
  {label:'11-20', value:'11-20'},
  {label:'21-30', value:'21-30'},
  {label:'31-40', value:'31-40'},
  {label:'41-50', value:'41-50'},
  {label:'51-60', value:'51-60'},
]

function getNumbersWithDigitSum(start:number, end:number, eqNumber:number) {
  const result = [];

  for (let i = start; i <= end; i++) {
    const digits = i.toString().split('');
    const sumOfDigits = digits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
    
    if (sumOfDigits === eqNumber) {
      result.push(i);
    }
  }

  return result;
}


 // Sum the numbers



const CheckInput = () => {
  const [checkedValue, setCheckedValue] = React.useState<string>('');
  const [choosedNumber, setChoosedNumber] = React.useState<number>();
  const [reminder, setReminder] = React.useState<number>(0);

  const handleRangeFormat = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(event.target.value);
    
    const _sum = event.target.value.split('-');
    // console.log('sum', +_sum[0]);
    
    const sumOfDigits = +_sum[1].toString()      // Convert number to string
  .split('')          // Split string into individual characters
  .map(Number)        // Convert characters to numbers
  .reduce((a, b) => a + b, 0);
    let final_number = (+_sum[1] - sumOfDigits) + +reminder;
    if (final_number > +_sum[1]) {
      let _lst = final_number.toString()      // Convert number to string
      .split('')          // Split string into individual characters
      .map(Number)        // Convert characters to numbers
        .reduce((a, b) => a + b, 0);
      let final = getNumbersWithDigitSum(+_sum[0], +_sum[1], _lst)
       setChoosedNumber(+final);
    } else {
      setChoosedNumber(final_number);
    } 
  }
  return (
    <div className='checkbo-wrapper'>
      <label>Add the last reminder you got</label>
      <input type="text" value={reminder } name="reminder" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setReminder(+event.target.value)} title="Reminder"/>
        <ul>
          {rangeFormat.map((range, key) => {
            return (
              <li key={key}>
                <input type="checkbox" name="range_format" title={range.label} value={range.value}
                  onChange={handleRangeFormat} checked={range.value === checkedValue}
                />

                <label>{range.label}</label>
                
              </li>
            )
          })}
      </ul>
      <h1>You choosed {choosedNumber} at first Otherwise you have choosen incorrect checkbox format.</h1>
      </div>
  )
}

export default CheckInput;