import rssPlugin from '@11ty/eleventy-plugin-rss';

export default async function(eleventyConfig) {
    // Passthroughs
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/css");

    // Filters
    eleventyConfig.addLiquidFilter("dateToRfc3339", rssPlugin.dateToRfc3339);
    eleventyConfig.addLiquidFilter("dateToRfc822", rssPlugin.dateToRfc822);
};

export const config = {
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",

    dir: {
        input: "src",
        output: "public",

        // Relative to input
        includes: "_includes",
        data: "_data",
    }
}