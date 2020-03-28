
        
let textOutput = document.createElement('textarea');
textOutput.classList.add(`textOutput`);
document.body.append(textOutput);


let pad = document.createElement('div');
pad.classList.add('pad');
document.body.append(pad);


const lang_pad = {
    en : [
        [ '`','~',], [ '1','!'], ['2','@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7','&'], ['8','*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], ['Backspace'],
        ['Tab'], ['q','Q' ], ['w','W' ], ['e','E' ], ['r','R'], ['t','T'], ['y','Y'], ['u','U'], ['i','I'], ['o','O'], ['p','P'], ['[','{'], [']', '}'], ['Enter'],
        ['CapsLock'], ['a','A'],['s','S'],['d','D'],['f','F'],['g','G'],['h','H'],['j','J'],['k','K'],['l','L'],[';',':'],["'", '"'],['\\', '|'],
        ['Shift'],['z','Z'],['x','X'],['c','C'],['v','V'],['b','B'],['n','N'],['m','M'],[',','<'],['.','>'],['/','?'],['Shift'],
        ['Ctrl'],['Win'], ['Alt'],[' '], ['Alt'],['Win'], ['Context'], ['Ctrl']
    ],

    ru : [
        [ 'ё','Ё'], [ '1','!'], ['2','"'], ['3', '№'], ['4', ';'], ['5', '%'], ['6', ':'], ['7','?'], ['8','*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], ['Backspace'],
        ['Tab'], ['й','Й' ], ['ц','Ц'], ['у','У'], ['к','К'], ['е','Е'], ['н','Н'], ['г','Г'], ['ш','Ш'], ['щ','Щ'], ['з','З'], ['х','Х'], ['ъ','Ъ'], ['Enter'],
        ['CapsLock'], ['ф','Ф'],['ы','Ы'],['в','В'],['а','А'],['п','П'],['р','Р'],['о','О'],['л','Л'],['д','Д'],['ж','Ж'],['э','Э'],['\\', '/'],
        ['Shift'],['я','Я'],['ч','Ч'],['с','С'],['м','М'],['и','И'],['т','Т'],['ь','Ь'],['б','Б'],['ю','Ю'],['.',','],['Shift'],
        ['Ctrl'],['Win'], ['Alt'],[' '], ['Alt'],['Win'], ['Context'], ['Ctrl']
    ],
},
keyPad_keys = [
    'Backquote', 'Digit1','Digit2','Digit3','Digit4','Digit5','Digit6','Digit7','Digit8','Digit9','Digit0','Minus','Equal', 'Backspace',
    'Tab', 'KeyQ','KeyW','KeyE','KeyR','KeyT','KeyY','KeyU','KeyI','KeyO','KeyP','BracketLeft','BracketRight','Enter',
    'CapsLock','KeyA','KeyS','KeyD','KeyF','KeyG','KeyH','KeyJ','KeyK','KeyL','Semicolon','Quote','Backslash',
    'ShiftLeft', 'KeyZ','KeyX','KeyC','KeyV','KeyB','KeyN','KeyM','Comma','Period','Slash','ShiftRight',
    'ControlLeft','OSLeft','AltLeft','Space', 'AltRight','OSRight', 'ContextMenu', 'ControlRight'
],

symbols = {
    en: {
        normal: '`1234567890-=qwertyuiop[]asdfghjkl;\'\\zxcvbnm,./',
        shifted: '~!@#$%^&*()_+QWERTYUIOP{}ASDFGHJKL:"|ZXCVBNM<>?',
    },
    ru: {
        normal: 'ё1234567890-=йцукенгшщзхъфывапролджэ\\ячсмитьбю.',
        shifted: '~!@#$%^&*()_+QWERTYUIOP{}ASDFGHJKL:"|ZXCVBNM<>?'
    }

},
key_func = ['Backspace','Tab','Enter','CapsLock','ShiftLeft','ShiftRight', 'ControlLeft','OSLeft','AltLeft','Space', 'AltRight','OSRight', 'ContextMenu', 'ControlRight'],
parametres = {
    lang: 'ru'
};



lang_pad[parametres.lang].map((el,i)=>{
    let key = document.createElement('div');
    key.classList.add(keyPad_keys[i]);
    if (key_func.includes(key.className)) {
        key.classList.add('key_func');
        key.classList.add('key');
    } else {
        key.classList.add('key');
    }
    pad.append(key);
    el.map(item=>{
        let span = document.createElement('span');
        if (symbols[parametres.lang].normal.includes(item)) {
            span.classList.add('normal');
        } else if (symbols[parametres.lang].shifted.includes(item)) {
            span.classList.add('shifted');
        }
        span.innerText = item;
        key.append(span);
    });

    document.querySelectorAll('.normal').forEach(el=>{
        el.classList.add('active');
    });
    
});


window.addEventListener('contextmenu', (e)=>{
    document.querySelectorAll('.key>span').forEach(item=>{
       if (!item.closest('div').className.includes('key_func')) {
        item.classList.toggle('active');
       }
    });
});

window.addEventListener('keydown', (e)=>{
    textOutput.focus();
    document.querySelectorAll('.key').forEach(el=>{
        if (el.className.includes(e.code)) {
            el.classList.add('pressed');
        }
    });
});

window.addEventListener('keyup', (e)=>{
    document.querySelectorAll('.key').forEach(el=>{
        if (el.className.includes(e.code)) {
            el.classList.remove('pressed');
        }
    });
});








