import React from 'react';
import * as jss from './jss';
import { IInputUiProps } from '../../form/props';

const Input: React.FC<IInputUiProps> = (props) => {
    const { name, label, minWidth = '0%', width = '100%', maxWidth = '100%', onBlur, onFocus, onChange } = props;

    const [isFocused, setIsFocused] = React.useState(!!props.value);
    
    const id = `fc-${name}`;
    const containerProps = { minWidth, width, maxWidth };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsFocused(!!event.target.value);
        onChange && onChange(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        setIsFocused(!!event.target.value);
        onBlur && onBlur(event);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        setIsFocused(true);
        onFocus && onFocus(event);
    };

    return (<jss.ContainerJss name={`container-${id}`} {...containerProps}>
        <jss.Label >
            {label}
        </jss.Label>
        <jss.Input {...props} key={id} name={name} isFocused={isFocused}
            onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
    </jss.ContainerJss>)
};

export default Input;