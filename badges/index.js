const { createBadgesFromMarkdown, createBadge } = require("../dist");

const label = "version";
const message = "1.0.0";
console.log(createBadge({ label, message }));

// createBadgesFromMarkdown();
