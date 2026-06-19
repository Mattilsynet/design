import { defineComponentContract } from "../component-contract";

export default defineComponentContract({
  "name": "Alert",
  "className": "alert",
  "tag": "output",
  "content": true,
  "parameters": [
    {
      "name": "color",
      "attribute": "data-color",
      "type": "enum",
      "enumName": "AlertColor",
      "values": [
        "info",
        "success",
        "warning",
        "danger",
        "neutral"
      ]
    }
  ]
} as const);
