import styled from "@emotion/styled";
import { IInputUiProps } from "../../form/props";

export const ContainerJss = styled.div<IInputUiProps>(({
    minWidth, width, maxWidth
}) => {
    return {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        minWidth,
        width,
        maxWidth,

        '@media (max-width: 900px)': {
            maxWidth: '100%'
        }
    };
})

interface IInputJssProps {
    isFocused: boolean;
};

export const Input = styled.input<IInputJssProps>((props) => {
    let focusedCss = {};
    
    if (props.isFocused) {
        focusedCss = { 
            borderColor: '#2196F3'
        }
    }
    
    return {
        borderRadius: '4px',
        border: '1px solid #ccc',
        padding: '4px 8px',
        height: '30px',
        transition: 'border-color 0.2s',
        fontSize: '14px',
        ...focusedCss
    };
});

export const Label = styled.label((props) => {
    return {
    }
});