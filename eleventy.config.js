export default async function(eleventyConfig) {
    const currentYear = new Date().getFullYear();
    eleventyConfig.addGlobalData("currentYear", currentYear);
};