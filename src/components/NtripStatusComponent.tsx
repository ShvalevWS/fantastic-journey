import {Card, Skeleton} from "antd-mobile";
import { useState } from "react";

export function NtripStatusComponent() {
  return (
    <Card className={'status status__ntrip'}>
      <span>NTRIP</span>
      <Skeleton.Title animated></Skeleton.Title>
    </Card>
  )
}
