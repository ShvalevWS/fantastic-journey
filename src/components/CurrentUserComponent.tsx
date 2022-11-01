import avatar from '../images/user.svg'
import {Button, Popover} from "antd-mobile";
import {Action} from "antd-mobile/es/components/popover";

export default function CurrentUserComponent() {

  const userName = 'John Smith';
  const actions: Action[] = [
  ]

  return (
    <Popover.Menu
      trigger={'click'}
      placement='bottom-start'
      actions={actions}
    >
      <Button className={'current-user'}>
        <span>{userName}</span>
        <img src={avatar} alt={userName}/>
      </Button>
    </Popover.Menu>
  )
}
