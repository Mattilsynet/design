import { defineComponentContract } from "../component-contract";

export default defineComponentContract({
  "name": "Tag",
  "className": "tag",
  "tag": "span",
  "content": true,
  "parameters": [
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
