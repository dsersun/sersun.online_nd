import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());


const buildFolder = `./dist`
const srcFolder = `./src`

export const path = {
    build: {
        js:  `${buildFolder}/js/`,
        images: `${buildFolder}/img/`,
        css:  `${buildFolder}/css/`,
        fonts:  `${buildFolder}/fonts/`,
        html: `${buildFolder}/`,
        files: `${buildFolder}/files/`
    },
    src: {
        js:  `${srcFolder}/js/app.js`,
        images:  `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/img/**/*.svg`,
        scss:  `${srcFolder}/scss/style.scss`,
        html: `${srcFolder}/*.html`, //.pug  - if using PUG
        files: `${srcFolder}/files/**/*.*`,
    },
    watch: {
        js:  `${srcFolder}/js/**/*.js`,
        images:  `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,svg,webp}`,
        scss:  `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/**/*.html`,
        files: `${srcFolder}/files/**/*.*`,
    },
    clean: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: ``
}