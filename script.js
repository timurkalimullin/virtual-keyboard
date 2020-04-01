class VK {
    constructor() {
        this.textOutput = null;
        this.pad = null;
        this.ru = null;
        this.en = null;
        this.capsLockState = false;
        this.lang_pad = {
            en : [
                [ '`','~',], [ '1','!'], ['2','@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7','&'], ['8','*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], ['Backspace'],
                ['Tab'], ['q','Q' ], ['w','W' ], ['e','E' ], ['r','R'], ['t','T'], ['y','Y'], ['u','U'], ['i','I'], ['o','O'], ['p','P'], ['[','{'], [']', '}'], ['Enter'],
                ['CapsLock'], ['a','A'],['s','S'],['d','D'],['f','F'],['g','G'],['h','H'],['j','J'],['k','K'],['l','L'],[';',':'],["'", '"'],['\\', '|'], ['Del'],
                ['Shift'],['z','Z'],['x','X'],['c','C'],['v','V'],['b','B'],['n','N'],['m','M'],[',','<'],['.','>'],['/','?'],['↑'],['Shift'],
                ['Ctrl'],['Win'], ['Alt'],[' '], ['Alt'],['Win'], ['Cyr'], ['Ctrl'],['← '], ['↓ '], ['→ ']
            ],
        
            ru : [
                [ 'ё','Ё'], [ '1','!'], ['2','"'], ['3', '№'], ['4', ';'], ['5', '%'], ['6', ':'], ['7','?'], ['8','*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], ['Backspace'],
                ['Tab'], ['й','Й' ], ['ц','Ц'], ['у','У'], ['к','К'], ['е','Е'], ['н','Н'], ['г','Г'], ['ш','Ш'], ['щ','Щ'], ['з','З'], ['х','Х'], ['ъ','Ъ'], ['Enter'],
                ['CapsLock'], ['ф','Ф'],['ы','Ы'],['в','В'],['а','А'],['п','П'],['р','Р'],['о','О'],['л','Л'],['д','Д'],['ж','Ж'],['э','Э'],['\\', '/'], ['Del'],
                ['Shift'],['я','Я'],['ч','Ч'],['с','С'],['м','М'],['и','И'],['т','Т'],['ь','Ь'],['б','Б'],['ю','Ю'],['.',','],['↑'], ['Shift'],
                ['Ctrl'],['Win'], ['Alt'],[' '], ['Alt'],['Win'], ['Lat'], ['Ctrl'],['← '], ['↓ '], ['→ ']
            ],
        };

        this.keyPad_keys = [
            'Backquote', 'Digit1','Digit2','Digit3','Digit4','Digit5','Digit6','Digit7','Digit8','Digit9','Digit0','Minus','Equal', 'Backspace',
            'Tab', 'KeyQ','KeyW','KeyE','KeyR','KeyT','KeyY','KeyU','KeyI','KeyO','KeyP','BracketLeft','BracketRight','Enter',
            'CapsLock','KeyA','KeyS','KeyD','KeyF','KeyG','KeyH','KeyJ','KeyK','KeyL','Semicolon','Quote','Backslash', 'Delete',
            'ShiftLeft', 'KeyZ','KeyX','KeyC','KeyV','KeyB','KeyN','KeyM','Comma','Period','Slash','ArrowUp', 'ShiftRight',
            'ControlLeft','OSLeft','AltLeft','Space', 'AltRight','OSRight', 'ContextMenu', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'
        ];
        this.letters = ['KeyQ','KeyW','KeyE','KeyR','KeyT','KeyY','KeyU','KeyI','KeyO','KeyP','BracketLeft','BracketRight',
        'KeyA','KeyS','KeyD','KeyF','KeyG','KeyH','KeyJ','KeyK','KeyL','Semicolon','Quote','Backslash',
        'KeyZ','KeyX','KeyC','KeyV','KeyB','KeyN','KeyM','Comma','Period','Slash'];
        
        this.symbols = {
            en: {
                normal: '`1234567890-=qwertyuiop[]asdfghjkl;\'\\zxcvbnm,./',
                shifted: '~!@#$%^&*()_+QWERTYUIOP{}ASDFGHJKL:"|ZXCVBNM<>?',
            },
            ru: {
                normal: 'ё1234567890-=йцукенгшщзхъфывапролджэ\\ячсмитьбю.',
                shifted: 'Ё!"№;%:?*()_+ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭ/ЯЧСМИТЬБЮ,'
            }
        
        };
        this.key_func = ['Backspace','Tab','Enter','CapsLock','ShiftLeft','ShiftRight', 'ControlLeft','OSLeft',
                    'AltLeft','Space', 'AltRight','OSRight', 'ContextMenu', 'ControlRight', 'Delete','ArrowUp',
                    'ArrowLeft', 'ArrowDown', 'ArrowRight'];

    }
    //  put lang var into local storage
    local() {
        if (localStorage.lang !== 'ru' && localStorage.lang !== 'en') {
            localStorage.setItem('lang', 'en');
        } 
    }
    // create textarea and main div
    createTextoutput() {
        this.textOutput = document.createElement('textarea');
        this.textOutput.classList.add(`textOutput`);
        document.body.append(this.textOutput);
        let info = document.createElement('div');
        info.classList.add('info');
        info.innerHTML = '<h1>Виртуальная клавиатура</h1><p> Переключение языка: левый контрол + левый альт на физической клавиатуре либо кнопка "Cyr/Lat" на виртуальной</p><p>Стрелки перемещают каретку вправо и влево, при нажатии стрелки "вверх" каретка переносится в начало строки,при нажатии стрелки "вниз" каретка переносится в конец строки,</p><p>Есть функции удаления через Backspace, Delete, также можно удалять выделяя текст и нажимая эти клавиши или просто вставляя символ</p>';
        document.body.prepend(info);
    }

    createPad() {
        this.pad = document.createElement('div');
        this.pad.classList.add('pad');
        document.body.append(this.pad);
    
        this.en = document.createElement('div');
        this.en.classList.add('en');
        this.en.classList.add('wrapper');
        if (localStorage.lang != 'en') {
            this.en.classList.add('hidden');
        }
        this.pad.append(this.en);
    
        this.ru = document.createElement('div');
        this.ru.classList.add('ru');
        this.ru.classList.add('wrapper');
        if (localStorage.lang != 'ru') {
            this.ru.classList.add('hidden');
        }
        this.pad.append(this.ru);
    }
    // draws a keyboard
     renderKeypad(lang) {
        this.lang_pad[lang].map((el,i)=>{
            let key = document.createElement('div');
            key.classList.add(this.keyPad_keys[i]);
            if (this.letters.includes(this.keyPad_keys[i])){
                key.classList.add('letter');
            }
            if (this.key_func.includes(key.className)) {
                key.classList.add('key_func');
                key.classList.add('key');
                key.setAttribute('id', this.keyPad_keys[i]);
            } else {
                key.classList.add('key');
            }
            document.querySelector(`.${lang}`).append(key);
            el.map(item=>{
                let span = document.createElement('span');
                if (this.symbols[lang].normal.includes(item)) {
                    span.classList.add('normal');
                } else if (this.symbols[lang].shifted.includes(item)) {
                    span.classList.add('shifted');
                }
                span.innerText = item;
                key.append(span);
            });
            document.querySelectorAll('.normal').forEach(el=>{
                el.classList.add('active');
            });
        });
    }
    // capslock function
    caps() {
        this.capsLockState = !this.capsLockState;
        document.querySelectorAll('.letter').forEach(key=>{
            key.querySelectorAll('span').forEach(item=>{
                item.classList.toggle('active');
            });
        });
    }

    // mousehandlers

    mousedownHandler() {
        if (event.target.id == 'CapsLock') {
            if (this.capsLockState == true) {
                document.querySelectorAll('#CapsLock').forEach(el=>{
                    el.classList.remove('pressed');
                });
            } else {
                document.querySelectorAll('#CapsLock').forEach(el=>{
                    el.classList.add('pressed');
                });
            }
            this.caps();
            } else if (event.target.className.includes('key')) {
 
                event.target.classList.add('pressed');
                this.pressed_down(event.target);
        }

    }

    mouseupHandler() {
        if (event.target.id !== 'CapsLock') {
            event.target.classList.remove('pressed');
            this.pressed_up(event.target);
        }
        this.textOutput.focus();
    }

    mouseleaveHandler() {
        if (event.currentTarget.getAttribute('id') !== 'CapsLock') {
            event.currentTarget.classList.remove('pressed');   
        }
        if (event.currentTarget.getAttribute('id') == 'ShiftRight' || event.currentTarget.getAttribute('id') == 'ShiftLeft') {
            this.pressed_up(event.currentTarget);
        }
    }

    // keypress in and out handlers

    keydownHandler() {
        event.preventDefault();

        this.textOutput.focus();

        let code = event.code,
        key = document.querySelector(`.${localStorage.lang} .${code}`);

        if (event.ctrlKey && event.altKey) {
            this.changeLang();
        }

        
        if (key.getAttribute('id') !== 'CapsLock') {
            key.classList.add('pressed');
            this.pressed_down(key);
        }
    }

    keyupHandler() {
        let code = event.code,
        key = document.querySelector(`.${localStorage.lang} .${code}`);
    
        if (key.getAttribute('id') !== 'CapsLock') {
            key.classList.remove('pressed');
            this.pressed_up(key);
        } else {
            if (this.capsLockState == true) {
                document.querySelectorAll('#CapsLock').forEach(el=>{
                    el.classList.remove('pressed');
                });
            } else {
                document.querySelectorAll('#CapsLock').forEach(el=>{
                    el.classList.add('pressed');
                });
            }
            this.caps();
        }
    }

    // insert letter symbols and handle function keys
    pressed_down(key) {
        let ins = key.getAttribute('id') || key.querySelector('.active').innerText,
        caret = this.findCaret()[0],
        string = this.textOutput.value.split('');
    
        if (!key.className.includes('key_func')) {
            if (this.findCaret()[0]==this.findCaret()[1]) {
                string.splice(caret,0,ins);
                this.textOutput.value = string.join('');
                this.textOutput.selectionStart = this.textOutput.selectionEnd = caret +1;
            } else {
                string.splice(this.findCaret()[0], this.findCaret()[1], ins);
                this.textOutput.value = string.join('');
                this.textOutput.selectionStart = this.textOutput.selectionEnd = caret +1;
            }

        }
    
        if (event.code == 'Backspace' || key.getAttribute('id') == 'Backspace') {
            if (this.findCaret()[0]<this.findCaret()[1]) {
                this.textOutput.value = string.join('');
                this.textOutput.setRangeText("", this.findCaret()[0], this.findCaret()[1], "end");
                this.textOutput.selectionStart = this.textOutput.selectionEnd = caret;
            } else if (this.findCaret[0]==this.findCaret[1]) {
                string.splice(caret-1,1);
                this.textOutput.value = string.join('');
                this.textOutput.selectionStart = this.textOutput.selectionEnd = caret - 1;
            } 
        }
    
        if (event.code == 'Delete' || key.getAttribute('id') == 'Delete') {
            if (this.findCaret()[0]<this.findCaret()[1]) {
                this.textOutput.value = string.join('');
                this.textOutput.setRangeText("", this.findCaret()[0], this.findCaret()[1], "end");
                this.textOutput.selectionStart = this.textOutput.selectionEnd = caret;
            } else if (this.findCaret[0]==this.findCaret[1]) {
                string.splice(caret,1);
                this.textOutput.value = string.join('');
                this.textOutput.selectionStart = this.textOutput.selectionEnd = caret ;
            } 
        }
    
        if (event.code == 'ShiftLeft' || key.getAttribute('id') == 'ShiftLeft' || event.code == 'ShiftRight' || key.getAttribute('id') == 'ShiftRight') {
            if (this.capsLockState == false) {
                document.querySelectorAll('.normal').forEach(item=>{
                    item.classList.remove('active');
                });
                document.querySelectorAll('.shifted').forEach(item=>{
                    item.classList.add('active');
                });
            } else {
                document.querySelectorAll('.key').forEach(el=>{
                    if (el.className.includes('letter')) {
                        el.childNodes.forEach(item=>{
                            if (item.className.includes('shifted')) {
                                item.classList.remove('active');
                            } else {
                                item.classList.add('active');
                            }
                        });
                    } else {
                        el.childNodes.forEach(item=>{
                            if (item.className.includes('shifted')) {
                                item.classList.add('active');
                            } else {
                                item.classList.remove('active');
                            }
                        });
                    }
                });
            }
        }
    
        if (event.code == 'Tab' || key.getAttribute('id') == 'Tab') {
            string.splice(caret,0,'    ');
            this.textOutput.value = string.join('');
            this.textOutput.selectionStart = this.textOutput.selectionEnd = caret +4;
        }
    
        if (event.code == 'Space' || key.getAttribute('id') == 'Space') {
            string.splice(caret,0,' ');
            this.textOutput.value = string.join('');
            this.textOutput.selectionStart = this.textOutput.selectionEnd = caret +1;
        }
    
        if (event.code == 'Enter' || key.getAttribute('id') == 'Enter') {
            string.splice(caret,0,'\n');
            this.textOutput.value = string.join('');
            this.textOutput.selectionStart = this.textOutput.selectionEnd = caret+1;
        }
    
        if (event.code == 'ArrowLeft' || key.getAttribute('id') == 'ArrowLeft') {
            if (this.textOutput.selectionStart>=0 && this.textOutput.selectionEnd >0 ) {
                this.textOutput.selectionStart = this.textOutput.selectionEnd -=1;
            }
        }
    
        if (event.code == 'ArrowRight' || key.getAttribute('id') == 'ArrowRight') {
            this.textOutput.selectionStart = this.textOutput.selectionEnd +=1;
        }
    
        if (event.code == 'ArrowUp' || key.getAttribute('id') == 'ArrowUp') {
            this.textOutput.selectionStart = this.textOutput.selectionEnd = 0;
        }  
        
        if (event.code == 'ArrowDown' || key.getAttribute('id') == 'ArrowDown') {
            this.textOutput.selectionStart = this.textOutput.selectionEnd = this.textOutput.value.length;
        }   
    
        if (event.code =='ContextMenu' || key.getAttribute('id') == 'ContextMenu') {
            let arr= ['ControlLeft', 'ControlRight', 'AltLeft', 'AltRight'];
    
            arr.map(el=>{
                document.querySelectorAll(`#${el}`).forEach(item=>{
                    item.classList.remove('pressed');
                });
            });
            this.changeLang();
        }
        this.textOutput.focus();
    }  

    pressed_up(key) {
        if (event.code == 'ShiftLeft' || key.getAttribute('id') == 'ShiftLeft' || event.code == 'ShiftRight' || key.getAttribute('id') == 'ShiftRight') {
            if (this.capsLockState == false) {
                document.querySelectorAll('.shifted').forEach(item=>{
                    item.classList.remove('active');
                });
                document.querySelectorAll('.normal').forEach(item=>{
                    item.classList.add('active');
                });
            } else {
                document.querySelectorAll('.key').forEach(el=>{
                    if (el.className.includes('letter')) {
                        el.childNodes.forEach(item=>{
                            if (item.className.includes('shifted')) {
                                item.classList.add('active');
                            } else {
                                item.classList.remove('active');
                            }
                        });
                    } else {
                        el.childNodes.forEach(item=>{
                            if (item.className.includes('shifted')) {
                                item.classList.remove('active');
                            } else {
                                item.classList.add('active');
                            }
                        });
                    }
                });
            }
        }
    
    }
    // finds caret position
    findCaret() {      
        return [this.textOutput.selectionStart, this.textOutput.selectionEnd];
    }

    changeLang() {
        if (localStorage.getItem('lang') == 'en') {
            localStorage.setItem('lang', 'ru');
        } else {
            localStorage.setItem('lang', 'en');
        }
        document.querySelectorAll('.wrapper').forEach(el=>{
            el.classList.toggle('hidden');
        });
    }

    listeners() {
        // handles keyboard events
    
        window.addEventListener('keydown', (e)=>{
            this.keydownHandler(e);
        });
    
        window.addEventListener('keyup', (e)=>{
            this.keyupHandler(e);
        });
    
    
    
        // handles mouse events 
    
        this.pad.addEventListener('mousedown', (e)=>{
            this.mousedownHandler(e);
        });
    
        this.pad.addEventListener('mouseup', (e)=>{
            this.mouseupHandler(e);
        });
    
        document.querySelectorAll('.key').forEach(el=>{
           el.addEventListener('mouseleave', (e)=>{
            this.mouseleaveHandler();
           });
        });
    
    }
}

window.onload = () =>{
    let keyboard = new VK();
    keyboard.createTextoutput();
    keyboard.createPad();
    keyboard.renderKeypad('en');
    keyboard.renderKeypad('ru');
    keyboard.listeners();
};







