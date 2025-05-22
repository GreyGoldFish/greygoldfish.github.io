import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

export default async function(eleventyConfig) {
    const layoutAliases = {
        "base": "layouts/base.njk",
        "post": "layouts/posts/default.njk",
        "project": "layouts/projects/default.njk",
    };

    const globalPartials = {
        paths: {
            "metaInfo": "partials/meta-info.njk",
            "siteHead": "partials/site-head.njk",
            // Add other partial paths here
        }
    };
    
    for (const alias in layoutAliases) {
        eleventyConfig.addLayoutAlias(alias, layoutAliases[alias]);
    }

    eleventyConfig.addNunjucksGlobal("partials", globalPartials.paths);

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