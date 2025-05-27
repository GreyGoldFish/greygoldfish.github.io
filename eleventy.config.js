import fs from "fs";
import path from "path";

import postcss from "postcss";

import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

const dirs = {
    input: "src",
    output: "dist",
    layouts: "layouts",
    partials: "partials",
    assets: "assets",
    styles: "styles",
};

const files = {
    css: path.join(dirs.styles, "index.css"),
};

const aliases = {
    layouts: {
        base: dirs.layouts + "/base.njk",
        home: dirs.layouts + "/home.njk",
        about: dirs.layouts + "/about.njk",
        post: dirs.layouts + "/post.njk",
        feed: dirs.layouts + "/feed.njk",
    },
    partials: {
        metaInfo: dirs.partials + "/meta-info.njk",
        banner: dirs.partials + "/banner.njk",
        hero: dirs.partials + "/hero.njk",
        pageHeader: dirs.partials + "/page-header.njk",
        footer: dirs.partials + "/footer.njk",
        sidebar: dirs.partials + "/sidebar.njk",
        cta: dirs.partials + "/cta.njk",
        pagination: dirs.partials + "/pagination.njk",
        paginationList: dirs.partials + "/pagination-list.njk",
        techStack: dirs.partials + "/tech-stack.njk",
    }
};

async function processTailwind() {
    const cssInputPath = path.join(dirs.input, files.css);
    const cssOutputPath = path.join(dirs.output, files.css);

    try {
        const css = fs.readFile(cssInputPath, "utf8");

        const result = await postcss().process(css, {
            from: cssInputPath,
            to: cssOutputPath,
        });

        // Ensure the output directory exists
        fs.mkdir(path.dirname(cssOutputPath), { recursive: true });
        // Write the processed CSS
        fs.writeFile(cssOutputPath, result.css);

        // Write the source map if it exists
        if (result.map) {
            fs.writeFile(`${cssOutputPath}.map`, result.map.toString());
        }

    } catch (error) {
        console.error("Error processing Tailwind CSS with PostCSS: ", error);
    }
}

export default async function(eleventyConfig) {
    for (const alias in aliases.layouts) {
        eleventyConfig.addLayoutAlias(alias, aliases.layouts[alias]);
    }

    eleventyConfig.addFilter("justYear", (date) => {
        if (!date) return "";
        const d = new Date(date);
        return d.getFullYear();
    });

    // Process Tailwind CSS with PostCSS
    eleventyConfig.on("eleventy.before", async () => {
        await processTailwind();
    });

    eleventyConfig.addWatchTarget(path.join(dirs.input, dirs.styles));

    eleventyConfig.addNunjucksGlobal("layouts", aliases.layouts);
    eleventyConfig.addNunjucksGlobal("partials", aliases.partials);

    eleventyConfig.addPassthroughCopy(path.join(dirs.input, dirs.assets));

    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    return {
        dir: {
            input: dirs.input,
            output: dirs.output,
        },
        templateFormats: ["md", "html", "njk"],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk",
    };
};