import rssPlugin from '@11ty/eleventy-plugin-rss';
import { DateTime } from "luxon"
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import markdownItAttrs from 'markdown-it-attrs';
import htmlmin from "html-minifier-terser";

export default async function(eleventyConfig) {
    // Passthroughs
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/robots.txt");

    // Plugins
    eleventyConfig.addPlugin(rssPlugin);
    eleventyConfig.addPlugin(eleventyImageTransformPlugin);
    eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItAttrs));

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

    // Shortcodes
    eleventyConfig.addShortcode("img-meta", function(src, alt, caption = "", attribution = "") {
        if (!src || !alt) {
            console.warn("img-meta shortcode: 'src' and 'alt' arguments are required.");
            return `<p style="color: red;">Error: Image 'src' and 'alt' are required for img-meta shortcode.</p>`;
        }

        const attributionHTML = attribution 
            ? `<span class="img-meta__attribution">${attribution}</span>` 
            : '';
        const captionHTML = caption 
            ? `<figcaption class="img-meta__caption">${caption}</figcaption>` 
            : '';

        return `
<figure class="img-meta">
  <div class="img-meta__image-wrapper">
    <img src="${src}" alt="${alt}" class="img-meta__image">
    ${attributionHTML}
  </div>
  ${captionHTML}
</figure>`;
    });

    // Preprocessors
    eleventyConfig.addPreprocessor("drafts", "njk,md,liquid", (data, content) => {
        if (data.draft && process.env.ELEVENTY_RUN_MODE == 'build') {
            // Ignore this file.
            return false;
        }
    });

    // Transforms
    eleventyConfig.addTransform("htmlmin", function (content) {
		if ((this.page.outputPath || "").endsWith(".html")) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
                conservativeCollapse: true,
			});

			return minified;
		}

		// If not an HTML output, return content as-is
		return content;
	});
};

export const config = {
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",

    dir: {
        input: "src",
        output: "_site",

        // Relative to input
        includes: "_includes",
        data: "_data",
    }
}