export type buttonVariant = 'primary' | 'secondary' | 'white'| 'borderWhite' | 'text' | 'link' | 'linkWhite' | 'icon' | 'danger';

export interface IButtonUiProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    variant?: buttonVariant;
    label?: string;
}