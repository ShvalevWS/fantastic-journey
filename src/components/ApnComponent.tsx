import {Form, List} from "antd-mobile";
import {useAppSelector} from "../store/hooks";
import {editedSimCard} from "../store/cellularSlice";

export function ApnComponent() {

  const sim = useAppSelector((state) => editedSimCard(state));

  return (
    <List className={'list'}>
      <List.Item description={sim!.apn.apn}>APN</List.Item>
      <List.Item description={sim!.apn.userName}>Username</List.Item>
      <List.Item description={sim!.apn.password}>Password</List.Item>
    </List>
  )
}
