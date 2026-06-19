import { defineComponentContract } from "../component-contract";

export default defineComponentContract({
  "name": "Logo",
  "className": "logo",
  "tag": "span",
  "content": true,
  "parameters": [
    {
      "name": "color",
      "attribute": "data-color",
      "type": "enum",
      "enumName": "LogoColor",
      "values": [
        "danger",
        "info"
      ]
    },
    {
      "name": "env",
      "attribute": "data-env",
      "type": "string"
    }
  ]
} as const);
