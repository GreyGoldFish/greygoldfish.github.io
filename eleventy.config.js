import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

export default async function(eleventyConfig) {
    eleventyConfig.setInputDirectory("src");

    eleventyConfig.addGlobalData("author", "Lucas Aquino de Assis");
    const currentYear = new Date().getFullYear();
    eleventyConfig.addGlobalData("currentYear", currentYear);

    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    eleventyConfig.addPassthroughCopy("css/tailwind.css");

    eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
    eleventyConfig.addLayoutAlias("post", "layouts/posts/default.njk");
    eleventyConfig.addLayoutAlias("project", "layouts/projects/default.njk");
};