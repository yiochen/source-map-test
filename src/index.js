import { SourceMapGenerator } from "source-map";
import convert from "convert-source-map";

const map = new SourceMapGenerator({
  file: "dist.js"
});

const content = `// This line will be skipped
I will set css class here
I will set color here
`;
map.setSourceContent("Original.js", content);

const generated = `div {
  color: red;  
}
`;
map.addMapping({
  generated: {
    line: 1,
    column: 0
  },
  source: "Original.js",
  original: {
    line: 2,
    column: 0
  }
});

map.addMapping({
  generated: {
    line: 2,
    column: 1
  },
  source: "Original.js",
  original: {
    line: 3,
    column: 0
  }
});

const style = document.createElement("style");

style.type = "text/css";

const sourceMapComment =
  convert
    .fromJSON(map.toString())
    .toComment()
    .replace("//#", "/*#") + " */";
style.appendChild(document.createTextNode(generated + sourceMapComment));
document.head.appendChild(style);
console.log(sourceMapComment);
