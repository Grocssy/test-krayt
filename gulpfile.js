var gulp = require('gulp');
var webpack = require('webpack-stream');
var rimraf = require('rimraf');
var rename = require("gulp-rename");
var watch = require('gulp-watch');

var jade = require('gulp-jade');

var preproc = require('gulp-css-preprocessor');
var concatCss = require('gulp-concat-css');
var autoprefixer = require('gulp-autoprefixer');

var svgSprites = require('gulp-svg-sprites');
const cheerio = require('gulp-cheerio');

var connect = require('gulp-connect');
var browserSync = require('browser-sync');

var preprocOptions = {
	'scss': {
		outputStyle: 'expanded'
	},
	'less': {},
	'stylus': {}
};

var svgOptions = {
	mode: "symbols",
	preview: false,
	svg: {
		sprite: "icons.svg"
	}
};

var path = {
	src: {
		styles: './frontend/common/styles/',
		scripts: './frontend/common/scripts/',
		html: './frontend/blocks/pages/**/',
		svg: './frontend/common/svg-icons/',
		resources: './frontend/resources/'
	},
	build: {
		styles: './public/styles/',
		scripts: './public/scripts/',
		html: './public/',
		svg: './public/svg/',
		resources: './public/'
	},
	watch: './frontend/**/',
	clean: './public/'
};

gulp.task('clean', cleanDirectory);

gulp.task('server', function() {
	connect.server({
		root: './public/',
		port: 8080,
		host: 'localhost',
		name: 'devServer',
		livereload: true
	});
});

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: "./public/"
		}
	});
});

gulp.task('styles:build', buildStyles);
gulp.task('scripts:build', buildScripts);
gulp.task('html:build', buildHtml);
gulp.task('svg:build', buildSvg);
gulp.task('resources:build', copyResources);
gulp.task('build', ['styles:build', 'scripts:build', 'html:build', 'svg:build', 'resources:build']);


function cleanDirectory(opt) {
	rimraf(path.clean, opt);
}

function buildStyles() {
	gulp.src(path.src.styles + 'app.*(scss|styl)')
		.pipe(preproc(preprocOptions))
		.pipe(concatCss('app.css'))
		.pipe(autoprefixer({browsers: ['last 3 versions']}))
		.pipe(gulp.dest(path.build.styles))
}

function buildScripts() {
	gulp.src(path.src.scripts + '*.js')
		.pipe(webpack(require('./webpack.config.js')))
		.pipe(gulp.dest(path.build.scripts))
}

function buildHtml() {
	gulp.src(path.src.html + '*.jade')
		.pipe(jade({pretty: true}))
		.pipe(rename({dirname: ""}))
		.pipe(gulp.dest(path.build.html))
}

function buildSvg() {
	gulp.src(path.src.svg + '*.svg')
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[style]').removeAttr('style');
				$('title').remove();
				$('style').remove();
			},
			parserOptions: { xmlMode: true }
		}))
		.pipe(svgSprites(svgOptions))
		.pipe(rename('svg-sprite.svg'))
		.pipe(gulp.dest(path.build.svg))
}

function copyResources() {
	gulp.src(path.src.resources + '**/*.*')
		.pipe(gulp.dest(path.build.resources))
}

gulp.task('watch', function() {
	watch(path.watch + '*.jade', function() {
		gulp.start('html:build');
		browserSync.reload();
	});
	watch(path.watch + '*.*(scss|styl)', function() {
		gulp.start('styles:build');
		browserSync.reload();
	});
	watch(path.watch + '*.js', function() {
		gulp.start('scripts:build');
		browserSync.reload();
	});
	watch(path.watch + '*.svg', function() {
		gulp.start('svg:build');
		browserSync.reload();
	});
	watch(path.src.resources + '**/*.*', function() {
		gulp.start('resources:build');
		browserSync.reload();
	});
});

gulp.task('default', ['clean'], function() {
	gulp.run(['build', 'server', 'browser-sync', 'watch'])
});