import rssPlugin from '@11ty/eleventy-plugin-rss';
import { DateTime } from "luxon"
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';

export default async function(eleventyConfig) {
    // Passthroughs
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/css");

    // Plugins
    eleventyConfig.addPlugin(rssPlugin);
    eleventyConfig.addPlugin(eleventyImageTransformPlugin);

    // Filters
    eleventyConfig.addLiquidFilter("dateToRfc3339", rssPlugin.dateToRfc3339);
    eleventyConfig.addLiquidFilter("dateToRfc822", rssPlugin.dateToRfc822);
    eleventyConfig.addLiquidFilter("dateToString", (dateObj, format) => {
      // Ensure dateObj is a Date object
      const jsDate = (dateObj instanceof Date) ? dateObj : new Date(dateObj);
      return DateTime.fromJSDate(jsDate, { zone: 'utc' }).toFormat(format);
    });
    eleventyConfig.addLiquidFilter("urlPage", (url) => {
        const urlPage = String(url).split('/');
        return urlPage[1]; 
    });
    eleventyConfig.addLiquidFilter("absoluteUrl", (urlFragment, base) => {
        if (typeof urlFragment === 'undefined' || urlFragment === null) {
            console.warn(`absoluteUrl filter: urlFragment is undefined or null.`);
            return ''; // Return empty or the original fragment if base is also missing
        }
        if (typeof base === 'undefined' || base === null) {
            console.warn(`absoluteUrl filter: base is undefined or null. Returning original urlFragment: ${urlFragment}`);
            return urlFragment;
        }
        try {
            return new URL(urlFragment, base).href;
        } catch (e) {
            console.error(`Error creating absolute URL for fragment "${urlFragment}" with base "${base}": ${e.message}`);
            return urlFragment; // Fallback to original fragment in case of an error
        }       
    });

    
    // Collections
    eleventyConfig.addCollection("post", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/content/posts/*.md");
    });
    eleventyConfig.addCollection("guide", function(collectionApi) {
        return collectionApi.getFilteredByGlob("src/content/guides/*.md");
    });
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