import React, { PropsWithChildren } from 'react';

interface IFormUiProps extends PropsWithChildren {
    onSubmitAsync: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

const FormUi: React.FC<IFormUiProps> = (props) => {
    const { children, onSubmitAsync } = props;

    const handleSubmitAsync = (event: React.FormEvent<HTMLFormElement>) => {
        if (!event) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        onSubmitAsync && onSubmitAsync(event);
    };

    return (<form onSubmit={handleSubmitAsync}>
        {children}
    </form>)
};

export default FormUi;