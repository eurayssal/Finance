import { PropsWithChildren } from "react";

export interface IModalProps extends PropsWithChildren {
    title?: string;
    onClose: () => void;
}
