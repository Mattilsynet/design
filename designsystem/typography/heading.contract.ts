import { defineComponentContract } from "../component-contract";

export default defineComponentContract({
  "name": "Heading",
  "className": "heading",
  "tag": "h2",
  "content": true,
  "parameters": [
    {
      "name": "size",
      "attribute": "data-size",
      "type": "enum",
      "enumName": "HeadingSize",
      "values": [
        "2xs",
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "2xl"
      ]
    },
    {
      "name": "justify",
      "attribute": "data-justify",
      "type": "enum",
      "enumName": "HeadingJustify",
      "values": [
        "start",
        "center"
      ]
    }
  ]
} as const);
