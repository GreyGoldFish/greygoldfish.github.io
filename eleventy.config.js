import fs from "fs";
import path from "path";

import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
import cssnano from 'cssnano';

import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

const dirs = {
    input: "src",
    output: "dist",
    layouts: "layouts",
    partials: "partials",
    components: "components",
    assets: "assets",
    styles: "styles",
};

const paths = {
    tailwind: "/" + path.join(dirs.styles, "index.css"),
};

const aliases = {
    layouts: {
        base: `${dirs.layouts}/base.njk`,
        home: `${dirs.layouts}/home.njk`,
        about: `${dirs.layouts}/about.njk`,
        post: `${dirs.layouts}/post.njk`,
        feed: `${dirs.layouts}/feed.njk`,
        portfolio: `${dirs.layouts}/portfolio.njk`,
        project: `${dirs.layouts}/project.njk`,
        contact: `${dirs.layouts}/contact.njk`,
    },
    partials: {
        meta: `${dirs.partials}/meta.njk`,
        banner: `${dirs.partials}/banner.njk`,
        hero: `${dirs.partials}/hero.njk`,
        intro: `${dirs.partials}/intro.njk`,
        footer: `${dirs.partials}/footer.njk`,
        sidebar: `${dirs.partials}/sidebar.njk`,
        cta: `${dirs.partials}/cta.njk`,
        pagination: `${dirs.partials}/pagination.njk`,
        listing: `${dirs.partials}/listing.njk`,
        tech: `${dirs.partials}/tech.njk`,
    },
    components: {
        button: `${dirs.components}/button.njk`,
        logo: `${dirs.components}/logo.njk`,
        navbar: `${dirs.components}/navbar.njk`,
        socials: `${dirs.components}/socials.njk`,
        card: `${dirs.components}/card.njk`,
        item: `${dirs.components}/item.njk`,
        form: `${dirs.components}/form.njk`,
        tooltip: `${dirs.components}/tooltip.njk`,
    }
};

// Define the PostCSS processor
const postcssPlugins = [
    tailwindcss(),
];

if (process.env.NODE_ENV === "production") {
    postcssPlugins.push(cssnano({ preset: "default" }));
}
const processor = postcss(postcssPlugins);

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

    // Process Tailwind CSS with PostCSS
    eleventyConfig.on("eleventy.before", async () => {
        const tailwindInputPath = path.join(dirs.input, paths.tailwind);
        const tailwindOutputPath = path.join(dirs.output, paths.tailwind);

        try {
            const css = fs.readFileSync(tailwindInputPath, "utf8");

            const result = await processor.process(css, {
                from: tailwindInputPath,
                to: tailwindOutputPath,
            });

            const outputDir = path.dirname(tailwindOutputPath);
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }
            fs.writeFileSync(tailwindOutputPath, result.css);

            if (result.map) {
                fs.writeFileSync(`${tailwindOutputPath}.map`, result.map.toString());
            }
            console.log(`Successfully processed Tailwind CSS to ${tailwindOutputPath}\n`);
        } catch (error) {
            console.error("Error processing Tailwind CSS with PostCSS:", error);
        }
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