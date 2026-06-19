import { defineComponentContract } from "../component-contract";

export default defineComponentContract({
  "name": "Input",
  "className": "input",
  "tag": "input",
  "content": false,
  "parameters": [
    {
      "name": "type",
      "attribute": "type",
      "type": "string",
      "default": "text"
    },
    {
      "name": "indeterminate",
      "attribute": "data-indeterminate",
      "type": "boolean"
    }
  ]
} as const);
