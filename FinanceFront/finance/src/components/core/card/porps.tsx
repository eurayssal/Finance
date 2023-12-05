import { PropsWithChildren } from "react";
import { alignItemsType, directionType, flexWrapType, justifyContentType } from "../display/model";

export interface ICardProps extends PropsWithChildren {
    flexDirection?: directionType,
    justifyContent?: justifyContentType,
    alignItems?: alignItemsType,
    flexWrap?: flexWrapType,
    gap?: number,
    width?: string | number
}