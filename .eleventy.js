module.exports = function(eleventyConfig) {
  /*
    eleventyConfig.addPassthroughCopy("path")
    معناها: "انسخ الملفات من المسار ده زي ما هي الى مسار البناء من غير ما اليفينتي يعالجها".
  */
 
  // نسخ الأصول الثابتة
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/img");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/assets/scss");
  eleventyConfig.addPassthroughCopy("src/assets/lib");
  
  // نسخ ملفات Netlify CMS
  eleventyConfig.addPassthroughCopy("src/admin");
  
  // نسخ ملف _redirects
  eleventyConfig.addPassthroughCopy("_redirects");

  // هذا الفلتر لتحديد نطاق من المصفوفة
  // مثال: {% for item in items | range(0, 5) %}
  eleventyConfig.addFilter("range", function(arr, start, end) {
    if (!Array.isArray(arr)) return [];
    return arr.slice(start, end);
  });

  const { DateTime } = require("luxon");
  // فلتر للتاريخ
  eleventyConfig.addFilter("date", (dateObj, format = "dd LLL yyyy") => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
  });

  // إعدادات المجلدات
  return {
    dir: {
      input: "src",        // مجلد المصدر (فين المشروع الأساسى)
      output: "_site",     // مجلد الخرج (فين يترندر الموقع بعد build)
      includes: "_includes", // ملفات القوالب المشتركة (partials/layouts)
      data: "_data"        // ملفات الـ global data (ملفات JSON/YAML/JS للبيانات)
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
