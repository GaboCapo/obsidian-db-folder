import { StyleVariables } from "helpers/Constants";
import {
    StylesConfig,
    GroupBase,
} from "react-select";

const CustomTagsStyles: StylesConfig<any, true, GroupBase<any>> = {
    container: () => ({
        position: "static",
        boxSizing: "border-box",
    }),
    menuPortal: (styles) => ({ ...styles, zIndex: 9999 }),
    control: (styles) => ({ ...styles, border: "none", boxShadow: "none" }),
    option: (styles, { data, isFocused }) => ({
        ...styles,
        backgroundColor: isFocused ? StyleVariables.TEXT_ACCENT_HOVER : data.color,
        color: "rgb(66, 66, 66)",
        padding: 0,
        textAlign: "center",
        ":hover": {
            backgroundColor: StyleVariables.TEXT_ACCENT_HOVER,
        },

    }),
    singleValue: (styles, { data }) => ({
        ...styles,
        backgroundColor: data.color
    }),
    multiValue: (styles, { data }) => {
        return {
            ...styles,
            backgroundColor: data.color + " !important",
        };
    },
    multiValueLabel: (styles) => ({
        ...styles,
        color: "black",
    }),
    multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: "black",
        ":hover": {
            backgroundColor: data.color + " !important",
            color: "white",
        },
    }),
};
export default CustomTagsStyles;