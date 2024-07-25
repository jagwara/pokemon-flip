import React,{ useState, useRef } from 'react';


import Image from 'next/image';
import { createWorker } from "tesseract.js";


const  ImageTextConverter = () =>{
  const [ocr, setOcr] = useState("");
  const [imageData, setImageData] = useState(null);
  const worker = createWorker({
    logger: (m) => {
      console.log('logger',m);
    },
  });

  const convertImageToText = async () => {
    if (!imageData) return;
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(imageData);
    console.log('text', text);
    
    setOcr(text);
  };

  React.useEffect(() => {
    convertImageToText();
  }, [imageData]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if(!file)return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUri = reader.result;
      // console.log({ imageDataUri });
      setImageData(imageDataUri);
    };
    reader.readAsDataURL(file);
  }

  return (
    
       <div>
        <label>Choose an Image</label>
        <input
          type="file"
          title='choose File'
          name=""
          id=""
          onChange={handleImageChange}
          accept="image/*"
      />
      <div className="display-flex">
        <Image src={imageData || ''} alt="" width="200" height="200" />
        <p>{ocr}</p>
      </div>
      </div>
      
    
  );
}

export default ImageTextConverter