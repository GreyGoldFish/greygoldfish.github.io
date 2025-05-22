import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

export default async function(eleventyConfig) {
    const aliases = {
        layouts: {
            "base": "layouts/base.njk",
            "home": "layouts/home.njk",
            "about": "layouts/about.njk",
            "post": "layouts/post.njk",
            "feed": "layouts/feed.njk",
        },
        partials: {
            "meta": "partials/meta.njk",
            "header": "partials/header.njk",
            "footer": "partials/footer.njk",
            "sidebar": "partials/sidebar.njk",
        }
    };

    for (const alias in aliases.layouts) {
        eleventyConfig.addLayoutAlias(alias, aliases.layouts[alias]);
    }

    eleventyConfig.addNunjucksGlobal("layouts", aliases.layouts);
    eleventyConfig.addNunjucksGlobal("partials", aliases.partials);

    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    return {
        dir: {
            input: "src",
        },
        templateFormats: ["md", "njk", "html"],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk",
    };
};