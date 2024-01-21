import { InputHTMLAttributes } from 'react';

export interface ISelectPropsUi {
    name: string;
    label: string;
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: ISelectOption[];
    minWidth? : number | string;
    width? : number | string;
    maxWidth? : number | string;
};

interface ISelectOption {
    value: string;
    label: string;
  }
  