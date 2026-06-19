import { defineComponentContract } from "../component-contract";

export default defineComponentContract({
  "name": "ButtonLink",
  "className": "button",
  "tag": "a",
  "content": true,
  "parameters": [
    {
      "name": "href",
      "attribute": "href",
      "type": "string",
      "required": true
    },
    {
      "name": "variant",
      "attribute": "data-variant",
      "type": "enum",
      "enumName": "ButtonVariant",
      "values": [
        "primary",
        "secondary",
        "tertiary"
      ]
    },
    {
      "name": "arrow",
      "attribute": "data-arrow",
      "type": "enum",
      "enumName": "ButtonArrow",
      "values": [
        "left",
        "right",
        "true"
      ]
    },
    {
      "name": "justify",
      "attribute": "data-justify",
      "type": "enum",
      "enumName": "ButtonJustify",
      "values": [
        "start",
        "center",
        "end",
        "right",
        "left"
      ]
    },
    {
      "name": "nowrap",
      "attribute": "data-nowrap",
      "type": "boolean"
    },
    {
      "name": "self",
      "attribute": "data-self",
      "type": "enum",
      "enumName": "ButtonSelf",
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
