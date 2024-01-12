import React from 'react'
import { IModalProps } from './props'
import * as jss from './jss'
import ButtonUi from '../buttons/buttons'
import { FaXmark } from "react-icons/fa6";


const ModalUi: React.FC<IModalProps> = ({
    title, onClose, children
}) => {
    return (
        <jss.DropModalJss onClick={onClose}>
            <jss.ModalBoxJss onClick={(e) => e.stopPropagation()}>
                <jss.ModalHeader>
                    <h3>{title}</h3>
                    <ButtonUi variant='text' onClick={onClose}><FaXmark/></ButtonUi>
                </jss.ModalHeader>
                <jss.ModalContent>
                    {children}
                </jss.ModalContent>
            </jss.ModalBoxJss>
        </jss.DropModalJss>
    )
}

export default ModalUi