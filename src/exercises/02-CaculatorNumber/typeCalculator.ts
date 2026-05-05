export type dataBtnType = {
    label: string,
    type:
        | "number"
        | "binaryOperator"
        | "unaryOperator"
        | "decimal"
        | "parentheses"
        | "action";
    value?: number | string,
}

export const dataBtn: dataBtnType[] = [
    {
        label: "C",
        type: "action",
        value: "clear",
    },
    {
        label: "()",
        type: "parentheses",
        value: "parentheses"
    },
    {
        label: "%",
        type: "unaryOperator",
        value: "percent",
    },
    {
        label: "÷",
        type: "binaryOperator",
        value: "/",
    },
    {
        label: "7",
        type: "number",
        value: 7,
    },
    {
        label: "8", 
        type: "number",
        value: 8,
    },
    {
        label: "9", 
        type: "number",
        value: 9,
    },
    {
        label: "x", 
        type: "binaryOperator",
        value: "*",
    },
    {
        label: "4",
        type: "number",
        value: 4,
    },
    {
        label: "5", 
        type: "number",
        value: 5,
    },
    {
        label: "6", 
        type: "number",
        value: 6,
    },
    {
        label: "-", 
        type: "binaryOperator",
        value: "-"
    },
    {
        label: "1",
        type: "number",
        value: 1,
    },
    {
        label: "2", 
        type: "number",
        value: 2,
    },
    {
        label: "3", 
        type: "number",
        value: 3,
    },
    {
        label: "+", 
        type: "binaryOperator",
        value: "+",
    },
    {
        label: "+/-",
        type: "unaryOperator",
        value: "toggleSign",
    },
    {
        label: "0", 
        type: "number",
        value: 0,
    },
    {
        label: ".", 
        type: "decimal",
        value: "."
    },
    {
        label: "=", 
        type: "action",
        value: "calculate",
    },
]