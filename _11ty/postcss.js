// _11ty/postcss.js
import fs from "fs";
import path from "path";
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
import cssnano from 'cssnano';

const postcssPlugins = [
    tailwindcss(),
];

if (process.env.NODE_ENV === "production") {
    postcssPlugins.push(cssnano({ preset: "default" }));
}
const processor = postcss(postcssPlugins);

export async function processTailwind(inputPath, outputPath) {
    try {
        const css = fs.readFileSync(inputPath, "utf8");

        const result = await processor.process(css, {
            from: inputPath,
            to: outputPath,
        });

        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        fs.writeFileSync(outputPath, result.css);

        if (result.map) {
            fs.writeFileSync(`${outputPath}.map`, result.map.toString());
        }
        console.log(`Successfully processed Tailwind CSS to ${outputPath}\n`);
    } catch (error) {
        console.error("Error processing Tailwind CSS with PostCSS:", error);
    }
}
