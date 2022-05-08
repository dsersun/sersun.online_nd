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

// Наблюдатель за изменеиниями в файлах
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
}

const mainTascks = gulp.parallel(copy, html);
// построение сценария выполнения задач
const dev  = gulp.series(reset, mainTascks, watcher);


// Выполнение сценария по умолчанию
gulp.task('default', dev);