import styled from "@emotion/styled"
import { ICardProps } from "./porps"

export const ContainerJss = styled.div<ICardProps>(({
    width, flexDirection, justifyContent, alignItems, flexWrap, gap
}) => {
    return {
      display: 'flex',
      padding: '16px',
      borderRadius: 6,
      backgroundColor: 'white',
      boxShadow: '0px 1px 15px 1px #d4d3d38f',
      flexDirection,
      justifyContent,
      alignItems,
      flexWrap,
      width,
      gap,
    }
  })