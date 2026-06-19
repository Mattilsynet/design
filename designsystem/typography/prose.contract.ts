import { defineComponentContract } from "../component-contract";

export default defineComponentContract({
  "name": "Prose",
  "className": "prose",
  "tag": "div",
  "content": true,
  "parameters": [
    {
      "name": "justify",
      "attribute": "data-justify",
      "type": "enum",
      "enumName": "ProseJustify",
      "values": [
        "start",
        "center",
        "end"
      ]
    }
  ]
} as const);
