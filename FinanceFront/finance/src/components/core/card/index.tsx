import React, { PropsWithChildren } from 'react';
import * as jss from './jss'

const CardUi:React.FC<PropsWithChildren> = ({children}) => {
  return (
    <jss.ContainerJss>
        {children}
    </jss.ContainerJss>
  )
}

export default CardUi