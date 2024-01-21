import React, { PropsWithChildren } from 'react';

interface IFormUiProps extends PropsWithChildren {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
};

const FormUi: React.FC<IFormUiProps> = (props) => {
    const { children, onSubmit } = props;

    return (<form onSubmit={onSubmit}>
        {children}
    </form>)
};

export default FormUi;