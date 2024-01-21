import React from "react";
import { ISelectPropsUi } from "./props";
import * as jss from './jss';
import DisplayFlexUi from "../display/display-flex.ui";

const SelectUi: React.FC<ISelectPropsUi> = (props) => {
    const { label, value, onChange, options} = props;

    return (<DisplayFlexUi flexDirection="column">
            <jss.LabelJss>{label}</jss.LabelJss>
            <select value={value} onChange={onChange}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </DisplayFlexUi>
    );
}

export default SelectUi;
