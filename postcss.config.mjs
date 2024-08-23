import { postcssIsolateStyles } from "vitepress";

export default {
	plugins: [postcssIsolateStyles()], // Ensure Vitepress styling does not affect Desginsystem styling
};
