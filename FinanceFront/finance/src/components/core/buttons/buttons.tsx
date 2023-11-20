//TODO - Adicionar opção de button com texto e icone
import React from "react";
import { IButtonUi } from "./props";
import * as jss from './jss';

const ButtonUi: React.FC<IButtonUi> = (props) => {
    const { children, variant = 'primary'} = props;

    return (<jss.buttonJss variant={variant} {...props}>
        {children}
    </jss.buttonJss>)
}

export default ButtonUi;
