import {Card, Skeleton} from "antd-mobile";
import {SetStateAction, useEffect, useState} from "react";




export function MobileConnectionStatusComponent() {

  const [data, setData] = useState(<Skeleton.Title animated></Skeleton.Title>)

  useEffect(() => {
    
    const sse = new EventSource('http://localhost:5000/stream')

    function handleStream(e: any){
      console.log(e)
      setData(e.data)
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
      <span>{data}</span>
    </Card>
  );
}
