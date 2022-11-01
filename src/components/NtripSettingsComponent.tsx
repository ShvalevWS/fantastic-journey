import {Button, Form, Input, Picker} from "antd-mobile";
import {useIntl} from "react-intl";
import {PasswordInput} from "./PasswordInput";
import {useState} from "react";
import selectDown from "../images/selectDown.svg";
import axios from "axios";

export function NtripSettingsComponent() {

  const intl = useIntl();
  const [mountPointVisible, setMountPointVisible] = useState(false);

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [port, setPort] = useState('')
  const [host, setHost] = useState('')
  const [mountpoint, setMountpoint] = useState('')

  const headers = {
    'Content-Type' : 'application/x-www-form-urlencoded;'
  }

  const data = {
    'r_username' : username,
    'r_password' : password,
    'r_port' : port,
    'r_host' : host,
    'r_mountpoint' : mountpoint
  }
  

  const request = () => {
    axios.post('http://127.0.0.1:5000/request_config', data, {
      headers: headers
    })
  }

  const columns = [[{label: 'Mon', value: 'Mon'},]];

  return (
      <Form className={'form form__settings-ntrip'}>
        <Form.Item label={intl.formatMessage({id: 'ntrip_settings_server'})}>
          <Input name={'server'} placeholder={intl.formatMessage({id: 'ntrip_settings_server_placeholder'})} value={host} onChange={setHost}></Input>
        </Form.Item>
        <Form.Item label={intl.formatMessage({id: 'ntrip_settings_port'})}>
          <Input name={'port'} placeholder={intl.formatMessage({id: 'ntrip_settings_port_placeholder'})} value={port} onChange={setPort}></Input>
        </Form.Item>
        <Form.Item label={intl.formatMessage({id: 'ntrip_settings_login'})}>
          <Input name={'login'} placeholder={intl.formatMessage({id: 'ntrip_settings_login_placeholder'})} value={username} onChange={setUsername}></Input>
        </Form.Item>
        <Form.Item label={intl.formatMessage({id: 'ntrip_settings_password'})}>
          <Input name={'password'} placeholder={intl.formatMessage({id: 'ntrip_settings_password_placeholder'})} value={password} onChange={setPassword}></Input>
        </Form.Item>
        <Form.Item label={intl.formatMessage({id: 'ntrip_settings_mount_point'})}>
          <Input name={'mountpoint'} placeholder={intl.formatMessage({id: 'ntrip_settings_mount_point_placeholder'})} value={mountpoint} onChange={setMountpoint}></Input>
        </Form.Item>
        <Form.Item>
            <Button onClick={request}>Save</Button>
        </Form.Item>
      </Form>
  )
}
