// eleventy.config.js
import path from "path";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import { dirs, paths, aliases } from "./_11ty/config.js";
import { processTailwind } from "./_11ty/postcss.js";

export default async function(eleventyConfig) {
    for (const alias in aliases.layouts) {
        eleventyConfig.addLayoutAlias(alias, aliases.layouts[alias]);
    }

    eleventyConfig.addFilter("year", (date) => {
        if (!date) return "";
        const d = new Date(date);
        return d.getFullYear();
    });

    eleventyConfig.addFilter("formatDateLong", (date) => {
        if (!date) return "";
        const d = new Date(date);
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    });

    eleventyConfig.addFilter("merge", (obj1, obj2) => {
        return {...obj1, ...obj2};
    });

    eleventyConfig.on("eleventy.before", async () => {
        const tailwindInputPath = path.join(dirs.input, paths.tailwind);
        const tailwindOutputPath = path.join(dirs.output, paths.tailwind);
        await processTailwind(tailwindInputPath, tailwindOutputPath);
    });

    eleventyConfig.addWatchTarget(path.join(dirs.input, dirs.styles));

    eleventyConfig.addNunjucksGlobal("paths", paths);
    for (const alias in aliases) {
        eleventyConfig.addNunjucksGlobal(alias, aliases[alias]);
    }

    eleventyConfig.addPassthroughCopy(path.join(dirs.input, dirs.assets));

    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    return {
        dir: {
            input: dirs.input,
            output: dirs.output,
        },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk",
    };
};
