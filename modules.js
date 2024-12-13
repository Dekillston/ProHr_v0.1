var mod = {
    save: { // Сохранения мода
        resize: [],
        resizeObserver: []
    },
    isMouse: () => {return !('ontouchstart' in document.documentElement)},
    //
    load: async (block, path) => { //  Загрузка файлов для вставки
        await new Promise(function(resolve, reject) { // Функция ожидания
            $.get('./'+path+'/'+path+'.html', function(data) {$(block).append(data);resolve()});
        })
        //
        return;
    },
    // Ждать обьект пока не выдаст true
    wait: async (ms, callback) => {
        await new Promise(function(resolve, reject) { // Функция ожидания
            (function w() {
                if(callback() == true) {resolve(); return;}
                //
                setTimeout(w, ms); 
            })();
        }); return;
    },
    //
    similarSizes: (block, bool) => { // Запуск одинаковой ширины или высоты
        mod.save.resizeObserver.push([block, bool]); // Добавляю данные в save
        //
        mod.resizeObserver.observe(block); // Запускаю цикл при изменении
        //
        return;
    },
    //
    //
    // Все Observer
    resizeObserver: new window.ResizeObserver(e => { // Запускается при изменениии размера
        //
        e.forEach(el => {
            //
            mod.save.resizeObserver.forEach(s => {
                if(el.target == s[0]) {
                    //
                    if(s[1]) {
                        s[0].style.height = el.contentRect.width+'px';
                    } else {
                        s[0].style.width = el.contentRect.height+'px';
                    }
                    //
                }
            }); return;
        }); return;
    }),
    //
    //
    // Все массовые циклы
    resize: (callback) => { // Изменение расширения экрана
        if(mod.save.resize.length == 0) { // Запускается один раз, пока в save ничего нету
            window.addEventListener('resize', () => {run(); return;}); // Запуск фунций при изменении
        }
        //
        callback(rundata()); // Запуск функции сразу
        //
        mod.save.resize.push(callback); // Добавление для запуска
        //
        function run() { // Запуск функция
            mod.save.resize.forEach(f => {
                f(rundata()); return;
            }); return;
        }
        // Вставить данные
        function rundata() {return {width: window.innerWidth, height: window.innerHeight};}
    }
}
//