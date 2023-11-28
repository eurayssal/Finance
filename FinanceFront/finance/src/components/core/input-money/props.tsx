export interface IMoneyInputProps {
    name: string;
    label? : string;
    required?: boolean;
    minWidth? : number | string;
    width? : number | string;
    maxWidth? : number | string;
    value: string;
    onBlur?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
    onChange: (value: string) => void;
}
