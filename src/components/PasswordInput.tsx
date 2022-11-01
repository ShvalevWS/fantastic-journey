import {Input} from "antd-mobile";
import {EyeInvisibleOutline, EyeOutline} from "antd-mobile-icons";
import {useState} from "react";
import {InputProps} from "antd-mobile/es/components/input/input";

export function PasswordInput(props: InputProps) {

  const [visible, setVisible] = useState(false);

  return (
    <div className={'password'}>
      <Input
        className={'input'}
        placeholder={props.placeholder}
        type={visible ? 'text' : 'password'}
      />
      <div className={'eye'}>
        {!visible ? (
          <EyeInvisibleOutline onClick={() => setVisible(true)}/>
        ) : (
          <EyeOutline onClick={() => setVisible(false)}/>
        )}
      </div>
    </div>
  );
}
