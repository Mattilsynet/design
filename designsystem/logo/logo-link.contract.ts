import { defineComponentContract } from "../component-contract";

export default defineComponentContract({
  "name": "LogoLink",
  "className": "logo",
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
