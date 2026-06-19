import { defineComponentContract } from "../component-contract";

export default defineComponentContract({
  "name": "Info",
  "className": "info",
  "tag": "div",
  "content": true,
  "parameters": [
    {
      "name": "variant",
      "attribute": "data-variant",
      "type": "enum",
      "enumName": "InfoVariant",
      "values": [
        "regular",
        "circle"
      ]
    }
  ]
} as const);
