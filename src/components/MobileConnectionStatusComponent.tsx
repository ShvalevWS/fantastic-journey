import {Card, Skeleton} from "antd-mobile";
import {SetStateAction, useEffect, useState} from "react";
import exellent from "../images/exellent.jpeg"




export function MobileConnectionStatusComponent() {

  const [data, setData] = useState(<Skeleton.Title animated></Skeleton.Title>)
  const [image, setImage] = useState()


  useEffect(() => {
    
    const sse = new EventSource('http://localhost:5000/modem_status')

    function handleStream(e: any){
      console.log(e)
      setData(e.data)
      setImage(e.data.image)
    }

    sse.onmessage = e =>{handleStream(e)}

    sse.onerror = e => {
      sse.close()
    }

    return () => {
      sse.close()
      
    }
  }, )  

  return (
    <Card className={'status status__mobile'}>
      <span>Mobile connection</span>
      <br></br>
      <span>
         {/* <img src={exellent}></img> */}
      </span>
      <br></br>
      <span>{data}</span>
    </Card>
  );
}
