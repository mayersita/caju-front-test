import { InputHTMLAttributes } from "react";
import { Input, InputDiv } from "./styles";

type Props = {
  label?: string;
  error?: string;
} & InputHTMLAttributes<any>;

const TextField = (props: Props) => {
  return (
    <InputDiv data-testid="text-field">
      <label htmlFor={props.id} aria-labelledby={props.label}>{props.label}</label>
      <Input id={props.id} {...props} $errorStyle={Boolean(props.error)}/>
      {props.error && <span style={{fontSize: 12, color: 'red'}}>{props.error}</span>}
    </InputDiv>
  )
}

export default TextField
