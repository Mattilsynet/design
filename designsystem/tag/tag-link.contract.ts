import { defineComponentContract } from "../component-contract";

export default defineComponentContract({
  "name": "TagLink",
  "className": "tag",
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
      "name": "icon",
      "attribute": "data-icon",
      "type": "enum",
      "enumName": "TagIcon",
      "values": [
        "true",
        "false",
        "none"
      ]
    }
  ]
} as const);
