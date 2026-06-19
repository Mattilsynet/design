import { defineComponentContract } from "../component-contract";

export default defineComponentContract({
  "name": "Skeleton",
  "className": "skeleton",
  "tag": "div",
  "content": true,
  "parameters": [
    {
      "name": "variant",
      "attribute": "data-variant",
      "type": "enum",
      "enumName": "SkeletonVariant",
      "values": [
        "circle",
        "text",
        "rectangle"
      ]
    }
  ]
} as const);
