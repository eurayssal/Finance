import React from 'react';
import * as jss from './jss'
import { ICardProps } from './porps';

const CardUi: React.FC<ICardProps> = (props) => {
    const { children, width } = props;
    return (
        <jss.ContainerJss {...props}>
            {children}
        </jss.ContainerJss>
    )
}

export default CardUi