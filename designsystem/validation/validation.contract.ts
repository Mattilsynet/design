import { defineComponentContract } from "../component-contract";

export default defineComponentContract({
  "name": "Validation",
  "className": "validation",
  "tag": "div",
  "content": true,
  "fixedAttributes": {
    "data-field": "validation"
  }
} as const);
