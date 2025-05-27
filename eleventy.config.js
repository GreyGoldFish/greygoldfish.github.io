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
            "metaInfo": "partials/meta-info.njk",
            "banner": "partials/banner.njk",
            "hero": "partials/hero.njk",
            "pageHeader": "partials/page-header.njk",
            "footer": "partials/footer.njk",
            "sidebar": "partials/sidebar.njk",
            "cta": "partials/cta.njk",
            "pagination": "partials/pagination.njk",
            "paginationList": "partials/pagination-list.njk",
            "techStack": "partials/tech-stack.njk",
        }
    };

    for (const alias in aliases.layouts) {
        eleventyConfig.addLayoutAlias(alias, aliases.layouts[alias]);
    }

    eleventyConfig.addNunjucksGlobal("layouts", aliases.layouts);
    eleventyConfig.addNunjucksGlobal("partials", aliases.partials);

    eleventyConfig.addFilter("justYear", (date) => {
        if (!date) return "";
        const d = new Date(date);
        return d.getFullYear();
    });

    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    eleventyConfig.addPassthroughCopy("src/assets");

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