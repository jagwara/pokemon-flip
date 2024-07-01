'use client'
import React from 'react';
import NextImage, { ImageProps } from 'next/image';
import clsx from 'clsx';
import { match } from 'assert';
function getRandomNumberBetween() {
  return Math.floor(Math.random() * 27) + 1;
}

function generateDoodle() {
  const doodleNumber = new Set();
  // doodleNumber.add(Array.from({length:15},getRandomNumberBetween ))
  // return doodleNumber
  while (doodleNumber.size < 15) {
    doodleNumber.add(getRandomNumberBetween());
  }
  const doodleNumberArray1 = Array.from(doodleNumber);
  const doodleNumberArray2 = [...doodleNumberArray1];
  const doodleNumbers = [...doodleNumberArray2, ...doodleNumberArray1];
  return doodleNumbers
  
}

function shuffle(array:any) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

type SelectDoodleType = {
  index: number,
  id: number
}

const DoodleModule = () => {
  
  const [flip, setFlip] = React.useState(false);
  const [ selectDoodle, setSelectDoodle ] = React.useState<Array<SelectDoodleType>>([])
  const [ winnerMessage, setWinnerMessage ] = React.useState<string>('')
  const [matchedDoodle, setMatchedDoodle] = React.useState<Array<SelectDoodleType>>([])
  
  const [doodles, setDoodles] = React.useState<Array<number>>([]);

  function getDoodleRiddles() {
    const doodleNumberArray = generateDoodle()
    const doodleNumbers:Array<number> = shuffle(doodleNumberArray);
    doodleNumbers?.length && setDoodles(doodleNumbers);
  }
  React.useEffect(() => {
    getDoodleRiddles()
  }, [])

  const onLevelChangeReset = () => {
    getDoodleRiddles()
    setMatchedDoodle([]);
    setWinnerMessage('');
    setSelectDoodle([]);
    setFlip(false)
  }
  
  function checkMatches(id:number, key:number) {
    const matches = matchedDoodle && matchedDoodle.length && matchedDoodle.find(item => item.id === id) 
    const _selectDoodle = selectDoodle.find(item => item.index === key)
    if (matches) {
      return true
    } else if (flip && _selectDoodle) {
      return true;
    }
  }

  console.log('test');
  
  const onFlipImage = ( key: number, id:number ) => {
    setFlip(true);
    const doodleExists = selectDoodle.find(item => item.id === id && key !== item.index);
    if (doodleExists) {
      setMatchedDoodle(prev => [...prev, { index: key, id }])
    } else {
      setSelectDoodle([{ index: key, id }]);
    }
    if (doodles.length / 2 === matchedDoodle.length) {
      setWinnerMessage( 'Wow, Congratulation Comleted the level.' )
    }
    setTimeout(() => {
      setFlip(false)
      selectDoodle.filter(item => item.id !== id && item.index !== key)
    },4000)
  }
  
  
  return (
    <div className="container mx-auto">
      
      <div className='grid  grid-cols-6 w-full gap-4' >
        {doodles && doodles.length && doodles.map((doodle: number, key) => {
        
        return (
          <div className='w-full h-[150px] relative  bg-red-500 group rounded-full'
            key={key}
            onClick={() => onFlipImage(key, doodle)}>
            <NextImage
              className={clsx(`image-wrapper absolute rounded-full p-3`,
                checkMatches(doodle, key) ? 'block' : 'hidden'
                
              )}
              src={`/${doodle}.png`}
              alt='image'
              quality={100}
              objectFit='cover'
              fill
              objectPosition="center center"
              
            />
          </div>
        )
      })}
      </div>
      <button type="button" onClick={onLevelChangeReset}>Reset</button>
    </div>
  )
}
export default DoodleModule;