import { defineComponentContract } from "../component-contract";

export default defineComponentContract({
  "name": "Link",
  "className": "link",
  "tag": "a",
  "content": true,
  "parameters": [
    {
      "name": "href",
      "attribute": "href",
      "type": "string"
    }
  ]
} as const);
