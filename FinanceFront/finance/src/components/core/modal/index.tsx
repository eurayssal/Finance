import React from 'react'
import { IModalProps } from './props'
import * as jss from './jss'

const ModalUi: React.FC<IModalProps> = ({
    title, onClose, children
}) => {
    return (
        <jss.DropModalJss>
            <jss.ModalBoxJss onClick={(e) => e.stopPropagation()}>
                <jss.ModalHeader>
                    <h3>{title}</h3>
                    <button onClick={onClose}>&times;</button>
                </jss.ModalHeader>
                <jss.ModalContent>
                    {children}
                </jss.ModalContent>
            </jss.ModalBoxJss>
        </jss.DropModalJss>
    )
}

export default ModalUi