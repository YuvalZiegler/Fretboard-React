
var dest = './build';
var src  = './src';
var test = './tests'



module.exports = {
  browserSync: {
    server: {
      // We're serving the src folder as well
      // for sass sourcemap linking
      baseDir: [dest, src, test]
    },
    browser: "google chrome canary",
    files: [
      dest + "/**",
      test + "/**",
      // Exclude Map files
      "!" + dest + "/**.map"
    ]
  },
  sass: {
    src: src + "/sass/*.scss",
    dest: dest + "/css"
  },
  images: {
    src: src + "/images/**",
    dest: dest + "/images"
  },
  markup: {
    src: src + "/htdocs/**",
    dest: dest
  },
  test: {
    src:  "tests/test-bundle.js",
    reporter: "spec",
    runInBrowser:true 
  },
  browserify: {
    // Enable source maps
    debug: true,
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/js/app.js',
      dest: dest,
      outputName: 'app.js'
    },
    {
      entries: test + '/tests_manifest.js',
      dest: test,
      outputName: 'test-bundle.js'
    }]
  }
};