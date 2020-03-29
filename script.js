
if (localStorage.lang !== 'ru' && localStorage.lang !== 'en') {
    localStorage.setItem('lang', 'en');
} 

       

let textOutput, pad, ru, en, capsLockState = false;
const lang_pad = {
    en : [
        [ '`','~',], [ '1','!'], ['2','@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7','&'], ['8','*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], ['Backspace'],
        ['Tab'], ['q','Q' ], ['w','W' ], ['e','E' ], ['r','R'], ['t','T'], ['y','Y'], ['u','U'], ['i','I'], ['o','O'], ['p','P'], ['[','{'], [']', '}'], ['Enter'],
        ['CapsLock'], ['a','A'],['s','S'],['d','D'],['f','F'],['g','G'],['h','H'],['j','J'],['k','K'],['l','L'],[';',':'],["'", '"'],['\\', '|'], ['Del'],
        ['Shift'],['z','Z'],['x','X'],['c','C'],['v','V'],['b','B'],['n','N'],['m','M'],[',','<'],['.','>'],['/','?'],['↑'],['Shift'],
        ['Ctrl'],['Win'], ['Alt'],[' '], ['Alt'],['Win'], ['Кириллица'], ['Ctrl'],['← '], ['↓ '], ['→ ']
    ],

    ru : [
        [ 'ё','Ё'], [ '1','!'], ['2','"'], ['3', '№'], ['4', ';'], ['5', '%'], ['6', ':'], ['7','?'], ['8','*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], ['Backspace'],
        ['Tab'], ['й','Й' ], ['ц','Ц'], ['у','У'], ['к','К'], ['е','Е'], ['н','Н'], ['г','Г'], ['ш','Ш'], ['щ','Щ'], ['з','З'], ['х','Х'], ['ъ','Ъ'], ['Enter'],
        ['CapsLock'], ['ф','Ф'],['ы','Ы'],['в','В'],['а','А'],['п','П'],['р','Р'],['о','О'],['л','Л'],['д','Д'],['ж','Ж'],['э','Э'],['\\', '/'], ['Del'],
        ['Shift'],['я','Я'],['ч','Ч'],['с','С'],['м','М'],['и','И'],['т','Т'],['ь','Ь'],['б','Б'],['ю','Ю'],['.',','],['↑'], ['Shift'],
        ['Ctrl'],['Win'], ['Alt'],[' '], ['Alt'],['Win'], ['Latin'], ['Ctrl'],['← '], ['↓ '], ['→ ']
    ],
},
keyPad_keys = [
    'Backquote', 'Digit1','Digit2','Digit3','Digit4','Digit5','Digit6','Digit7','Digit8','Digit9','Digit0','Minus','Equal', 'Backspace',
    'Tab', 'KeyQ','KeyW','KeyE','KeyR','KeyT','KeyY','KeyU','KeyI','KeyO','KeyP','BracketLeft','BracketRight','Enter',
    'CapsLock','KeyA','KeyS','KeyD','KeyF','KeyG','KeyH','KeyJ','KeyK','KeyL','Semicolon','Quote','Backslash', 'Delete',
    'ShiftLeft', 'KeyZ','KeyX','KeyC','KeyV','KeyB','KeyN','KeyM','Comma','Period','Slash','ArrowUp', 'ShiftRight',
    'ControlLeft','OSLeft','AltLeft','Space', 'AltRight','OSRight', 'ContextMenu', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'
],

symbols = {
    en: {
        normal: '`1234567890-=qwertyuiop[]asdfghjkl;\'\\zxcvbnm,./',
        shifted: '~!@#$%^&*()_+QWERTYUIOP{}ASDFGHJKL:"|ZXCVBNM<>?',
    },
    ru: {
        normal: 'ё1234567890-=йцукенгшщзхъфывапролджэ\\ячсмитьбю.',
        shifted: 'Ё!"№;%:?*()_+ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭ/ЯЧСМИТЬБЮ,'
    }

},
key_func = ['Backspace','Tab','Enter','CapsLock','ShiftLeft','ShiftRight', 'ControlLeft','OSLeft',
            'AltLeft','Space', 'AltRight','OSRight', 'ContextMenu', 'ControlRight', 'Delete','ArrowUp',
            'ArrowLeft', 'ArrowDown', 'ArrowRight'];

createTextoutput();

createPad();

renderKeypad('en');
renderKeypad('ru');

listeners();

// handles keyboard press and mouse clicks

function listeners() {
    // handles keyboard events

    window.addEventListener('keydown', (e)=>{
        e.preventDefault();

        let code = e.code,
        key = document.querySelector(`.${localStorage.lang} .${code}`);

        if (e.ctrlKey && e.altKey) {
            changeLang();
        }

        key.classList.add('pressed');
        if (key.getAttribute('id') !== 'CapsLock') {
            pressed_down(key);
        } else if (key.getAttribute('id') == 'CapsLock') {
           
            caps();
        }
    });

    window.addEventListener('keyup', (e)=>{
        let code = e.code,
        key = document.querySelector(`.${localStorage.lang} .${code}`);

        if (key.getAttribute('id') !== 'CapsLock') {
            key.classList.remove('pressed');
            pressed_up(key);
        }
    });

    // handles mouse events 

    pad.addEventListener('mousedown', mousedownHandler);

    pad.addEventListener('mouseup', mouseupHandler);

    document.querySelectorAll('.key').forEach(el=>{
        if (el.getAttribute('id') !== 'CapsLock') {
            el.addEventListener('mouseleave', mouseleaveHandler);
        }
    });

}

// creates main divs

function createTextoutput() {
    textOutput = document.createElement('textarea');
    textOutput.classList.add(`textOutput`);
    document.body.append(textOutput);

}

function createPad() {
    pad = document.createElement('div');
    pad.classList.add('pad');
    document.body.append(pad);

    en = document.createElement('div');
    en.classList.add('en');
    en.classList.add('wrapper');
    if (localStorage.lang != 'en') {
        en.classList.add('hidden');
    }
    pad.append(en);

    ru = document.createElement('div');
    ru.classList.add('ru');
    ru.classList.add('wrapper');
    if (localStorage.lang != 'ru') {
        ru.classList.add('hidden');
    }
    pad.append(ru);
}

// draws keypad

function renderKeypad(lang) {
    lang_pad[lang].map((el,i)=>{
        let key = document.createElement('div');
        key.classList.add(keyPad_keys[i]);
        if (key_func.includes(key.className)) {
            key.classList.add('key_func');
            key.classList.add('key');
            key.setAttribute('id', keyPad_keys[i]);
        } else {
            key.classList.add('key');
        }
        document.querySelector(`.${lang}`).append(key);
        el.map(item=>{
            let span = document.createElement('span');
            if (symbols[lang].normal.includes(item)) {
                span.classList.add('normal');
            } else if (symbols[lang].shifted.includes(item)) {
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

// handles capslock

function caps() {
    if (capsLockState == true) {
        document.querySelectorAll('#CapsLock').forEach(el=>{
            el.classList.remove('pressed');
        });
    } else {
        document.querySelectorAll('#CapsLock').forEach(el=>{
            el.classList.add('pressed');
        });
    }
    capsLockState = !capsLockState;
    document.querySelectorAll('span').forEach(key=>{
        key.classList.toggle('active');
    });
}

// mousehandlers

function mousedownHandler() {
    if (event.target.id == 'CapsLock') {
        caps(event.target);
    } else if (event.target.className.includes('key')) {
        textOutput.focus();
        event.target.classList.add('pressed');
        pressed_down(event.target);
    }
}

function mouseupHandler() {
    if (event.target.id !== 'CapsLock') {
        event.target.classList.remove('pressed');
        pressed_up(event.target);
    }
}

function mouseleaveHandler() {
    event.target.classList.remove('pressed');
        
}


// insert letter symbols and handle function keys

function pressed_down(key, e) {
    let ins = key.getAttribute('id') || key.querySelector('.active').innerText,
    caret = findCaret()[0],
    string = textOutput.value.split('');

    if (!key.className.includes('key_func')) {
        string.splice(caret,0,ins);
        textOutput.value = string.join('');
        textOutput.selectionStart = textOutput.selectionEnd = caret +1;
    }

    if (key.code == 'Backspace' || key.getAttribute('id') == 'Backspace') {
        if (findCaret()[0]<findCaret()[1]) {
            textOutput.value = string.join('');
            textOutput.setRangeText("", findCaret()[0], findCaret()[1], "end");
            textOutput.selectionStart = textOutput.selectionEnd = caret;
        } else if (findCaret[0]==findCaret[1]) {
            string.splice(caret-1,1);
            textOutput.value = string.join('');
            textOutput.selectionStart = textOutput.selectionEnd = caret - 1;
        } 
    }

    if (key.code == 'Delete' || key.getAttribute('id') == 'Delete') {
        if (findCaret()[0]<findCaret()[1]) {
            textOutput.value = string.join('');
            textOutput.setRangeText("", findCaret()[0], findCaret()[1], "end");
            textOutput.selectionStart = textOutput.selectionEnd = caret;
        } else if (findCaret[0]==findCaret[1]) {
            string.splice(caret,1);
            textOutput.value = string.join('');
            textOutput.selectionStart = textOutput.selectionEnd = caret + 1;
        } 
    }

    if (key.code == 'ShiftLeft' || key.getAttribute('id') == 'ShiftLeft' || key.code == 'ShiftRight' || key.getAttribute('id') == 'ShiftRight') {
        if (capsLockState == false) {
            document.querySelectorAll('.normal').forEach(item=>{
                item.classList.remove('active');
            });
            document.querySelectorAll('.shifted').forEach(item=>{
                item.classList.add('active');
            });
        } else {
            document.querySelectorAll('.normal').forEach(item=>{
                item.classList.add('active');
            });
            document.querySelectorAll('.shifted').forEach(item=>{
                item.classList.remove('active');
            });
        }
    }

    if (key.code == 'Tab' || key.getAttribute('id') == 'Tab') {
        string.splice(caret,0,'    ');
        textOutput.value = string.join('');
        textOutput.selectionStart = textOutput.selectionEnd = caret +4;
    }

    if (key.code == 'Space' || key.getAttribute('id') == 'Space') {
        string.splice(caret,0,' ');
        textOutput.value = string.join('');
        textOutput.selectionStart = textOutput.selectionEnd = caret +1;
    }

    if (key.code == 'Enter' || key.getAttribute('id') == 'Enter') {
        string.splice(caret,0,'\n');
        textOutput.value = string.join('');
        textOutput.selectionStart = textOutput.selectionEnd = caret+1;
    }

    if (key.code == 'ArrowLeft' || key.getAttribute('id') == 'ArrowLeft') {
        textOutput.selectionStart = textOutput.selectionEnd -=1;
    }

    if (key.code == 'ArrowRight' || key.getAttribute('id') == 'ArrowRight') {
        textOutput.selectionStart = textOutput.selectionEnd +=1;
    }

    if (key.code == 'ArrowUp' || key.getAttribute('id') == 'ArrowUp') {
        textOutput.selectionStart = textOutput.selectionEnd = 0;
    }  
    
    if (key.code == 'ArrowDown' || key.getAttribute('id') == 'ArrowDown') {
        textOutput.selectionStart = textOutput.selectionEnd = textOutput.value.length;
    }   

    if (key.code =='ContextMenu' || key.getAttribute('id') == 'ContextMenu') {
        changeLang();
    }


}  

function pressed_up(key) {
    if (key.code == 'ShiftLeft' || key.getAttribute('id') == 'ShiftLeft' || key.code == 'ShiftRight' || key.getAttribute('id') == 'ShiftRight') {
        if (capsLockState == false) {
            document.querySelectorAll('.shifted').forEach(item=>{
                item.classList.remove('active');
            });
            document.querySelectorAll('.normal').forEach(item=>{
                item.classList.add('active');
            });
        } else {
            document.querySelectorAll('.shifted').forEach(item=>{
                item.classList.add('active');
            });
            document.querySelectorAll('.normal').forEach(item=>{
                item.classList.remove('active');
            });
        }
    }
}

// finds caret location

function findCaret() {      
    return [textOutput.selectionStart, textOutput.selectionEnd];
}

// change language

function changeLang() {
    capsLockState = false;
    document.querySelectorAll('#CapsLock').forEach(el=>{
        el.classList.remove('pressed');
    });
    document.querySelectorAll('.shifted').forEach(el=>{
        el.classList.remove('active');
    });
    document.querySelectorAll('.normal').forEach(el=>{
        el.classList.add('active');
    });
    if (localStorage.getItem('lang') == 'en') {
        localStorage.setItem('lang', 'ru');
    } else {
        localStorage.setItem('lang', 'en');
    }
    document.querySelectorAll('.wrapper').forEach(el=>{
        el.classList.toggle('hidden');
    });

}





