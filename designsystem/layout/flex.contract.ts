import { defineComponentContract } from "../component-contract";

export default defineComponentContract({
  "name": "Flex",
  "className": "flex",
  "tag": "div",
  "content": true,
  "parameters": [
    {
      "name": "align",
      "attribute": "data-align",
      "type": "enum",
      "enumName": "FlexAlign",
      "values": [
        "normal",
        "stretch",
        "start",
        "center",
        "end"
      ]
    },
    {
      "name": "alignContent",
      "attribute": "data-align-content",
      "type": "enum",
      "enumName": "FlexAlignContent",
      "values": [
        "start",
        "center",
        "end",
        "space-between",
        "space-around",
        "space-evenly"
      ]
    },
    {
      "name": "center",
      "attribute": "data-center",
      "type": "enum",
      "enumName": "FlexCenter",
      "values": [
        "sm",
        "md",
        "lg",
        "xl",
        "2xl"
      ]
    },
    {
      "name": "gap",
      "attribute": "data-gap",
      "type": "enum",
      "enumName": "FlexGap",
      "values": [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "18",
        "22",
        "26",
        "30",
        "none",
        "xs",
        "sm",
        "md",
        "lg",
        "xl"
      ]
    },
    {
      "name": "rowGap",
      "attribute": "data-row-gap",
      "type": "enum",
      "enumName": "FlexRowGap",
      "values": [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "18",
        "22",
        "26",
        "30"
      ]
    },
    {
      "name": "columnGap",
      "attribute": "data-column-gap",
      "type": "enum",
      "enumName": "FlexColumnGap",
      "values": [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "18",
        "22",
        "26",
        "30"
      ]
    },
    {
      "name": "nowrap",
      "attribute": "data-nowrap",
      "type": "boolean"
    },
    {
      "name": "justify",
      "attribute": "data-justify",
      "type": "enum",
      "enumName": "FlexJustify",
      "values": [
        "start",
        "center",
        "end",
        "space-between",
        "space-around",
        "space-evenly"
      ]
    },
    {
      "name": "fixed",
      "attribute": "data-fixed",
      "type": "boolean"
    },
    {
      "name": "items",
      "attribute": "data-items",
      "type": "enum",
      "enumName": "FlexItems",
      "values": [
        "auto",
        "full",
        "25",
        "50",
        "75",
        "100",
        "125",
        "150",
        "175",
        "200",
        "225",
        "250",
        "275",
        "300",
        "325",
        "350",
        "375",
        "400",
        "425",
        "450",
        "475",
        "500",
        "525",
        "550",
        "575",
        "600"
      ]
    }
  ]
} as const);
