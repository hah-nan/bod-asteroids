KEYCODES = { left: 37, up: 38, right: 39, down: 40 };

$('.cyclic_input').keydown(function(ev){
    input = $(this);
    val = $(this).text();
    
    switch (ev.keyCode) {   
      case KEYCODES.right:
        input.next().focus();
        break;
      case KEYCODES.left:
        input.prev().focus();
        break;
      case KEYCODES.up:
        input.text(advanceCharBy(val, 1));
        break;
      case KEYCODES.down:
        input.text(advanceCharBy(val, -1));
        break;
      default:
        if (ev.keyCode >= 65 && ev.keyCode <= 65 + 26) {
            input.text(String.fromCharCode(ev.keyCode));
            input.next().focus();
        }
    };
    ev.preventDefault();
});

advanceCharBy = function(char, distance) {
    oldCode = char.charCodeAt(0);
    newCode = 65 + (oldCode - 65 + 26 + distance) % 26;
    return String.fromCharCode(newCode);
};
