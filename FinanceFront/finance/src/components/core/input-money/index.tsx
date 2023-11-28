import React from 'react';
import { IMoneyInputProps } from './props';
import * as jss from './jss';

const formatMoney = (value: string): string => {
    const numericValue = value.replace(/[^0-9]/g, '');
    const formattedValue = (parseFloat(numericValue) / 100).toFixed(2);
    const normalizedValue = formattedValue.replace('.', ',');
    const floatValue = parseFloat(normalizedValue)

    if (isNaN(floatValue)) {
        return ''
    }

    const displayValue = `R$ ${formattedValue.replace('.', ',')}`;

    return displayValue;
};

const InputMoneyUi: React.FC<IMoneyInputProps> = (props) => {
    const { name, label, minWidth = '0%', width = '100%', maxWidth = '100%', value, onChange, onBlur, onFocus } = props;
    const containerProps = { minWidth, width, maxWidth };

    const [isFocused, setIsFocused] = React.useState(!!props.value);

    const id = `fc-${name}`;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const formattedValue = formatMoney(inputValue);
        const numericValue = formattedValue.replace('R$ ', '').replace(',', '.');
        onChange(numericValue);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        setIsFocused(!!event.target.value);
        onBlur && onBlur(event);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        setIsFocused(true);
        onFocus && onFocus(event);
    };

    return (<jss.ContainerJss name={`container-${id}`} {...containerProps} >
        <jss.Label>{label}</jss.Label>
        <jss.Input value={formatMoney(value)} key={id} name={name}
            onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}
            isFocused={isFocused} placeholder="R$ 00,00" />
    </jss.ContainerJss>);
};

export default InputMoneyUi;
