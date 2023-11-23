import React from 'react';
import Input from '../core/input';
import { IInputUiProps } from './props';

const InputUi: React.FC<IInputUiProps> = ({
    ...props
}) => {
    return (<Input {...props} />)
};

export default InputUi;