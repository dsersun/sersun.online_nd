import fs, { appendFile } from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
    //
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "FONTS",
            message: "Error:<%= error.message %>"
        })))

        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))

}

export const ttf2woff = () => {
    //
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "FONTS",
            message: "Error:<%= error.message %>"
        })))
        // конвертируем в 
        .pipe(fonter({
            formats: ['woff']
        }))
        // выгружаем в папку с результатами
        .pipe(app.gulp.dest(`${app.path.buildFolder}/fonts/`))
        // ищим в исходниках шрифты ttf и ...
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
        // конвертируем в woff2
        .pipe(ttf2woff2())
        // выгружаем в папку с результатами
        .pipe(app.gulp.dest(`${app.path.buildFolder}/fonts/`))
}

export const fontsStyle = () => {
    // Файл стилей подключения шрифтов
    let fontsFile =`${app.path.srcFolder}/scss/fonts.scss`;
    // Проверяем существуют ли файлы шрифтов
    fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
        if (fontsFiles) {
            // Проверяем есть ли файл стилейдля подключения шрифтов
            if (!fs.existsSync(fontsFile)) {
                // Если НЕТ, то создаем его
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (var i = 0; i < fontsFile.length; i++) {
                    //
                    let fontsFileName = fontsFiles[i].split('.')[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName; 
                        if (fontWeight.LowerCase() === 'thin') {
                            fontWeight = 100;
                        } else if (fontWeight.LowerCase() === 'extralight') {
                            fontWeight = 200;
                        } else if (fontWeight.LowerCase() === 'light') {
                            fontWeight = 300;
                        } else if (fontWeight.LowerCase() === 'medium') {
                            fontWeight = 500;
                        } else if (fontWeight.LowerCase() === 'semibild') {
                            fontWeight = 600;
                        } else if (fontWeight.LowerCase() === 'bold') {
                            fontWeight = 700;
                        } else if (fontWeight.LowerCase() === 'extrabold') {
                            fontWeight = 800;
                        } else if (fontWeight.LowerCase() === 'black') {
                            fontWeight = 900;
                        } else {
                            fontWeight = 400;
                        }
                        fs.appendFile(fontsFile,
                            `@font-face {
                                font-family: $(fontName);
                                font-display: swap;
                                src: url("../fonts/${fontFileName}.woff2") format("woff2"),
                                     url("../fonts/${fontFileName}.woff") format("woff");
                                font-weight: $(fontWeight);
                                font-style: normal;
                            }\r\n`, cb);
// `@font-face { \n\t font-family: $(fontName);\n\t font-display: swap; \n\t src: url("../fonts/${fontFileName}.woff2") format("woff2"),\n\t url("../fonts/${fontFileName}.woff") format("woff");\n\t font-weight: $(fontWeight);\n\t font-style: normal;\n\t}\r\n`, cb);
                        newFileOnly = fontFileName;
                    } 
                }
            } else {
                // если файл есть, выводим сообщение
                console.log("Файл scss/fonts.scss уже существует.")
            }
        }
    });

    return app.gulp.src(`${app.path.srcFolder}`);
    function cb() {}
}