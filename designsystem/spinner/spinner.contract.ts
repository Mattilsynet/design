import { defineComponentContract } from "../component-contract";

export default defineComponentContract({
  "name": "Spinner",
  "className": "spinner",
  "tag": "span",
  "content": true,
  "parameters": [
    {
      "name": "size",
      "attribute": "data-size",
      "type": "enum",
      "enumName": "SpinnerSize",
      "values": [
        "xs",
        "sm",
        "md",
        "lg"
      ]
    },
    {
      "name": "state",
      "attribute": "data-state",
      "type": "enum",
      "enumName": "SpinnerState",
      "values": [
        "complete"
      ]
    }
  ]
} as const);
