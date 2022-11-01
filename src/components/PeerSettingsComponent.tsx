import {Button, Form, Input} from "antd-mobile";
import {useIntl} from "react-intl";
// import {PasswordInput} from "./PasswordInput";
import axios from "axios";
import { useState } from "react";




export function PeerSettingsComponent() {

  const intl = useIntl();

  const headers = {
    'Content-Type' : 'application/x-www-form-urlencoded;'
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [port, setPort] = useState('')
  const [mountpoint, setMountpoint] = useState('')

  const data = {
    'username' : username,
    'password' : password,
    'port' : port,
    'mountpoint' : mountpoint
  }
  

  const request = () => {
    axios.post('http://127.0.0.1:5000/peer_config', data, {
      headers: headers
    })
  }

  return (
      <Form className={'form form__settings-ntrip'}>
        <Form.Item label={intl.formatMessage({id: 'ntrip_settings_login'})}>
          <Input name={'login'} placeholder={intl.formatMessage({id: 'ntrip_settings_login_placeholder'})} value={username} onChange={event => setUsername(event)}></Input>
        </Form.Item>
        <Form.Item label={intl.formatMessage({id: 'ntrip_settings_password'})}>
          <Input name={'password'} placeholder={intl.formatMessage({id: 'ntrip_settings_password_placeholder'})} value={password} onChange={event => setPassword(event)}></Input>
        </Form.Item>
        <Form.Item label={intl.formatMessage({id: 'ntrip_settings_port'})}>
          <Input name={'port'} placeholder={intl.formatMessage({id: 'ntrip_settings_port_placeholder'})} value={port} onChange={event => setPort(event)}></Input>
        </Form.Item>
        <Form.Item label={intl.formatMessage({id: 'ntrip_settings_mount_point'})}>
          <Input name={'mountpoint'} placeholder={intl.formatMessage({id: 'ntrip_settings_mount_point_placeholder'})} value={mountpoint} onChange={event => setMountpoint(event)}></Input>
        </Form.Item>
        <Form.Item>
            <Button onClick={() => request()}>Save</Button>
        </Form.Item>
      </Form>

  )
}
