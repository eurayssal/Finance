//TODO - Adicionar opção de button com texto e icone
import React from "react";
import { IButtonUiProps } from "./props";
import * as jss from './jss';

const ButtonUi: React.FC<IButtonUiProps> = (props) => {
    const { children, variant = 'primary'} = props;

    return (<jss.buttonJss variant={variant} {...props}>
        {children}
    </jss.buttonJss>)
}

export default ButtonUi;
