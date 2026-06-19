import { defineComponentContract } from "../component-contract";

export default defineComponentContract({
  "name": "Card",
  "className": "card",
  "tag": "div",
  "content": true,
  "parameters": [
    {
      "name": "pad",
      "attribute": "data-pad",
      "type": "enum",
      "enumName": "CardPad",
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
      "name": "radius",
      "attribute": "data-radius",
      "type": "enum",
      "enumName": "CardRadius",
      "values": [
        "sm",
        "md",
        "lg",
        "xl"
      ]
    },
    {
      "name": "clickDelegateFor",
      "attribute": "data-clickdelegatefor",
      "type": "string"
    }
  ]
} as const);
