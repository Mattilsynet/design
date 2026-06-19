import { defineComponentContract } from "../component-contract";

export default defineComponentContract({
  "name": "Divider",
  "className": "divider",
  "tag": "hr",
  "content": false,
  "fixedAttributes": {
    "aria-hidden": "true"
  },
  "parameters": [
    {
      "name": "gap",
      "attribute": "data-gap",
      "type": "enum",
      "enumName": "DividerGap",
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
    }
  ]
} as const);
