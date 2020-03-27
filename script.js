let textOutput = document.createElement('textarea');
textOutput.classList.add(`textOutput`);
document.body.append(textOutput);
let pad = document.createElement('div');
pad.classList.add('pad');
document.body.append(pad);

const lang_pad = {
    en : [
        [ '`','~',], [ '1','!'], ['2','@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7','&'], ['8','*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], ['Backspace'],
        ['Tab'], ['q' ], ['w' ], ['e' ], ['r'], ['t'], ['y'], ['u'], ['i'], ['o'], ['p'], ['[','{'], [']', '}'], ['Enter'],
        ['CapsLock'], ['a'],['s'],['d'],['f'],['g'],['h'],['j'],['k'],['l'],[';',':'],["'", '"'],['\\', '|'],
        ['LShift'],['z'],['x'],['c'],['v'],['b'],['n'],['m'],[',','<'],['.','>'],['/','?'],['RShift'],
        ['LCtrl'],['Win'], ['LAlt'],['Space'], ['Ralt'],['Win'], ['Context'], ['RCtrl']
    ],

    ru : [
        [ 'ё'], [ '1','!'], ['2','"'], ['3', '№'], ['4', ';'], ['5', '%'], ['6', ':'], ['7','?'], ['8','*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], ['Backspace'],
        ['Tab'], ['й' ], ['ц' ], ['у' ], ['к'], ['е'], ['н'], ['г'], ['ш'], ['щ'], ['з'], ['х'], ['ъ'], ['Enter'],
        ['CapsLock'], ['ф'],['ы'],['в'],['а'],['п'],['р'],['о'],['л'],['д'],['ж'],["э"],['\\', '/'],
        ['LShift'],['я'],['ч'],['с'],['м'],['и'],['т'],['ь'],['б'],['ю'],['.',','],['RShift'],
        ['LCtrl'],['Win'], ['LAlt'],['Space'], ['Ralt'],['Win'], ['Context'], ['RCtrl']
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
    symb: '`1234567890-=qwertyuiop[]asdfghjkl;\'\\zxcvbnm,./ёйцукенгшщзхъфывапролджэячсмитьбю.',
    symb_shifted: '~!@#$%^&*()_+{}:"|<>?"№:?/,'
},
key_func = ['Backspace','Tab','Enter','CapsLock','ShiftLeft','ShiftRight', 'ControlLeft','OSLeft','AltLeft','Space', 'AltRight','OSRight', 'ContextMenu', 'ControlRight'],
parametres = {
    shifted: false,
    lang: 'en',
    capsLock:false
};

lang_pad[parametres.lang].map((el,i)=>{
    let div;
    div = document.createElement('div');
    if (key_func.includes(el[0])) {
        div.classList.add('key_func');
        div.classList.add(keyPad_keys[i]);
    } else {
        div.classList.add('key');
        div.classList.add(keyPad_keys[i]);
    }
    el.map(item=>{
        let span = document.createElement('span');
        if (symbols.symb.includes(item)) {
            span.classList.add('symb');
        } else if (symbols.symb_shifted.includes(item)) {
            span.classList.add('symb_shifted');
        } else {
            span.classList.add('func');
        }

        span.innerHTML = item.toUpperCase();
        div.append(span);
    });
    pad.append(div);
});



