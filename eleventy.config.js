// eleventy.config.js
import path from "path";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { dirs, paths, aliases } from "./_11ty/config.js";
import { processTailwind } from "./_11ty/postcss.js";
import { filters } from "./_11ty/filters.js";
import { collections } from "./_11ty/collections.js";

export default async function(eleventyConfig) {
    
    // Plugins
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(syntaxHighlight);

    // Layout Aliases
    for (const alias in aliases.layouts) {
        eleventyConfig.addLayoutAlias(alias, aliases.layouts[alias]);
    }

    // Filters
    for (const filterName in filters) {
        eleventyConfig.addFilter(filterName, filters[filterName]);
    }

    // Collections
    for (const collectionName in collections) {
        eleventyConfig.addCollection(collectionName, collections[collectionName]);
    }

    // PostCSS and Tailwind
    eleventyConfig.on("eleventy.before", async () => {
        const tailwindInputPath = path.join(dirs.input, paths.tailwind);
        const tailwindOutputPath = path.join(dirs.output, paths.tailwind);
        await processTailwind(tailwindInputPath, tailwindOutputPath);
    });
    eleventyConfig.addWatchTarget(path.join(dirs.input, dirs.styles));

    // Nunjucks Globals
    eleventyConfig.addNunjucksGlobal("paths", paths);
    for (const alias in aliases) {
        eleventyConfig.addNunjucksGlobal(alias, aliases[alias]);
    }

    // Passthrough Copy
    eleventyConfig.addPassthroughCopy(path.join(dirs.input, dirs.assets));

    // Eleventy Configuration
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
