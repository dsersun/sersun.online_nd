// Основной путь
import gulp from "gulp";
// импорт путей
import { path } from "./gulp/config/path.js";
// импорт плагинов
import { plugins } from "./gulp/config/plugins.js";


//Передаем значения в глобальную переменную
global.app = {
    path: path,
    gulp: gulp,
    plugins: plugins
}
// импорт задач
import { copy } from "./gulp/task/copy.js";
import { reset } from "./gulp/task/reset.js";
import { html } from "./gulp/task/html.js";
import { server } from "./gulp/task/server.js";
import { scss } from "./gulp/task/scss.js";

// Наблюдатель за изменеиниями в файлах
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
}

const mainTascks = gulp.parallel(copy, html, scss);
// построение сценария выполнения задач
const dev  = gulp.series(reset, mainTascks, gulp.parallel(watcher,server));


// Выполнение сценария по умолчанию
gulp.task('default', dev);