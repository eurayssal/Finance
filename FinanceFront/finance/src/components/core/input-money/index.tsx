import React from 'react';
import styled from '@emotion/styled';
import { IMoneyInputProps } from './props';

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
`;

const formatMoney = (value: string): string => {
    const numericValue = value.replace(/[^0-9]/g, '');
    const formattedValue = (parseFloat(numericValue) / 100).toFixed(2);
    const normalizedValue = formattedValue.replace('.', ',');
    const floatValue = parseFloat(normalizedValue)

    if (isNaN(floatValue)) {
        return ''
    }
    return normalizedValue;
};

const InputMoneyUi: React.FC<IMoneyInputProps> = ({ value, onChange }) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const formattedValue = formatMoney(inputValue);
        onChange(formattedValue.replace(',', '.'));
    };

    return (
        <Input
            type="text"
            value={formatMoney(value)}
            onChange={handleChange}
            placeholder="R$ 00,00"
        />
    );
};

export default InputMoneyUi;
