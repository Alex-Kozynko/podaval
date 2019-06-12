'use strict';
 
var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber      = require('gulp-plumber'),
    browserSync  = require('browser-sync'),
    del          = require('del'),
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cache        = require('gulp-cache'),
    rigger 		 = require('gulp-rigger'),
    webp         = require('gulp-webp'),
    replace      = require('gulp-replace'),
    image        = require('gulp-image');

sass.compiler = require('node-sass');

gulp.task('html', function () {
	return gulp.src(['!temp/include/**/*', 'temp/**/*.html', 'temp/**/.htaccess'])
		.pipe(rigger())
		.pipe(gulp.dest('', function(file) {
            return file.base
        }))
});

gulp.task('sass', function () {
  return gulp.src('scss/**/*.scss')
    .pipe(plumber())
  	.pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        proxy: 'big.kyiv',
        notify: false, // Отключаем уведомления

    });
});

gulp.task('scripts', function() {
    return gulp.src([ // Берем все необходимые библиотеки
        'js/jquery-3.3.1.min.js',
        'js/wow.js',
        'js/jquery.parallax-scroll.js',
        'js/plugin.js',
        /*'js/ajax.js',*/
        ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('js')); // Выгружаем в папку js
});
 
gulp.task('watch', ['browser-sync', 'sass', 'scripts', 'html'], function () {
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('temp/**/*.html', ['html', browserSync.reload]);
  gulp.watch('js/**/*.js', browserSync.reload);
});

gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});


gulp.task('img', function() {
    return gulp.src('img/**/*.*') // Берем все изображения из app
        .pipe(cache(image()))
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('clear-cache', () =>
    cache.clearAll()
);


gulp.task('build', ['clean', 'img' , 'sass', 'scripts', 'html'], function() {

    var buildAll = gulp.src(['!{scss,scss/**/*}', '!{temp,temp/**/*}', '!css/{maps,maps/**/*}', '!temp/**/.htaccess', '!img/**/*', '**/*', '**/.htaccess'])
    /*.pipe(replace('.png', '.webp'))
    .pipe(replace('.jpg', '.webp'))*/
    .pipe(gulp.dest('dist'));
    
});