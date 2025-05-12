import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

export default async function(eleventyConfig) {
    const currentYear = new Date().getFullYear();
    eleventyConfig.addGlobalData("currentYear", currentYear);

    eleventyConfig.addPlugin(eleventyNavigationPlugin);
};