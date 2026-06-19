import { defineComponentContract } from "../component-contract";

export default defineComponentContract({
  "name": "Badge",
  "className": "badge",
  "tag": "span",
  "content": true,
  "parameters": [
    {
      "name": "badge",
      "attribute": "data-badge",
      "type": "string"
    }
  ]
} as const);
