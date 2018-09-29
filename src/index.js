import { SourceMapGenerator } from "source-map";
import convert from "convert-source-map";

function generateSourceMap(content, dist, mapping) {
    const map = new SourceMapGenerator({
        file: "dist.js",
    });

    map.setSourceContent("Original.js", content);
    map.addMapping(mapping);
    return convert
        .fromJSON(map.toString())
        .toComment()
        .replace("//#", "/*#") + " */";
}

const content = `// This line will be skipped
I will set css class here
I will set color here
`;


const generated = `div {
  color: red;  
}
`;

const firstMapping = {
    generated: {
        line: 1,
        column: 0
    },
    source: "Original.js",
    original: {
        line: 2,
        column: 0
    }
};

const sourceMapComment = generateSourceMap(content, generated, firstMapping);
const style = document.createElement("style");
style.type = "text/css";
style.appendChild(document.createTextNode(generated + sourceMapComment));
document.head.appendChild(style);

const changedContent = `// I am a totally different file
I like piza
I also like coffee
`;

const button = document.querySelector('button');

button.addEventListener('click', () => {
    const changedSourceMap = generateSourceMap(changedContent, generated, firstMapping);
    style.innerHTML = generated + changedSourceMap;
});