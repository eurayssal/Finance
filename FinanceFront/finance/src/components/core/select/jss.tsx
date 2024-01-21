import styled from "@emotion/styled";
import { ISelectPropsUi } from "./props";

export const ContainerJss = styled.div<ISelectPropsUi>(({ minWidth, width, maxWidth }) => {
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
});

export const SelectJss = styled.select<ISelectPropsUi>(({
    minWidth, width, maxWidth
}) => {
    return {
        borderRadius: '4px',
        border: '1px solid #ccc',
        padding: '4px 8px',
        height: '30px',
        transition: 'border-color 0.2s',
        fontSize: '14px',
        minWidth,
        width,
        maxWidth,

        '@media (max-width: 900px)': {
            maxWidth: '100%'
        }
    };
});

export const LabelJss = styled.label((props) => {
    return {};
});
