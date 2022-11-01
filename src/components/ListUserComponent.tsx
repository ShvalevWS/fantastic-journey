import {List} from "antd-mobile";

export function ListUserComponent() {

  const users = [
    {ip: '192.168.1.1', mac: '12-12-12-12-12-12'},
    {ip: '192.168.1.2', mac: '12-12-12-12-12-12'},
    {ip: '192.168.1.3', mac: '12-12-12-12-12-12'},
    {ip: '192.168.1.5', mac: '12-12-12-12-12-12'},
    {ip: '192.168.1.6', mac: '12-12-12-12-12-12'},
  ];

  

  return (
    <List className={'list list__users'}>
      {users.map(u=> <List.Item><div>{u.ip}</div><div>{u.mac}</div></List.Item>)}
    </List>
  )
}
