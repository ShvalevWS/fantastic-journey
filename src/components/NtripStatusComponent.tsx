import {Card, Skeleton} from "antd-mobile";
import { useState } from "react";

const [data, setData] = useState(<Skeleton.Title animated></Skeleton.Title>)

export function NtripStatusComponent() {
  return (
    <Card className={'status status__ntrip'}>
      <span>NTRIP</span>
      <span>{data}</span>
    </Card>
  )
}
