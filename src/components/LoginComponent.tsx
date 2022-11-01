import {Button, Form, Input} from "antd-mobile";
import {FormattedMessage, useIntl} from "react-intl";
import {EyeInvisibleOutline, EyeOutline} from "antd-mobile-icons";
import {useState} from "react";
import logo from '../images/logo.svg'
import {PasswordInput} from "./PasswordInput";

export function LoginComponent() {
  const intl = useIntl();


  const emailPlaceholder = intl.formatMessage({id: 'email'});
  const passwordPlaceholder = intl.formatMessage({id: 'password'});
  const title = intl.formatMessage({id: 'vi_base_title'});

  return (
    <Form className={'form form__login'} footer={
      <Button block color='primary' size='large'>
        <FormattedMessage id={'login'}></FormattedMessage>
      </Button>
    }>
      <Form.Header>
        <img alt={title} src={logo}/>
        <h1>        {title}          </h1>
      </Form.Header>
      <Form.Item label={emailPlaceholder}>
        <Input name={'login'} onChange={console.log} placeholder={emailPlaceholder}/>
      </Form.Item>
      <Form.Item label={passwordPlaceholder}>
        <PasswordInput name={'password'} placeholder={passwordPlaceholder}/>
      </Form.Item>

    </Form>
  )
}
