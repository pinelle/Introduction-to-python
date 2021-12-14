Array.prototype.append = [].push;

import {core, event, visual} from 'psychopy';
class Button extends object {
    constructor(window, pos = [0, 0], width = 6, height = 2, fillColor = "White", hoverFillColor = "Grey", clickFillColor = "Black", textColor = "Black", hoverTextColor = "White", clickTextColor = "White", borderColor = "Black", text = null, noMouse = false) {
        this.window = window;
        this.pos = pos;
        this.width = width;
        this.height = height;
        this.fillColor = fillColor;
        this.hoverFillColor = hoverFillColor;
        this.clickFillColor = clickFillColor;
        this.textColor = textColor;
        this.hoverTextColor = hoverTextColor;
        this.clickTextColor = clickTextColor;
        this.borderColor = borderColor;
        this.text = text;
        this.mouse = new psychoJS.eventManager.Mouse({"win": this.window, "visible": (! noMouse)});
        this.previously_clicking = true;
        this._clicked = false;
        this.button_rect = new visual.Rect(this.window, {"pos": this.pos, "width": this.width, "height": this.height, "fillColor": this.fillColor, "lineColor": this.borderColor});
        this.label = new visual.TextStim(this.window, {"pos": this.pos, "wrapWidth": this.width, "color": this.textColor, "text": this.text.toString()});
    }
    draw() {
        var clicking, mouse_pos;
        mouse_pos = this.mouse.getPos();
        clicking = this.mouse.getPressed()[0];
        if ((this.button_rect.contains(mouse_pos) && (! clicking))) {
            this.button_rect.setFillColor(this.hoverFillColor);
            this.label.setColor(this.hoverTextColor);
        } else {
            if (this.button_rect.contains(mouse_pos)) {
                this.button_rect.setFillColor(this.clickFillColor);
                this.label.setColor(this.clickTextColor);
                if ((! this.previously_clicking)) {
                    this._clicked = true;
                }
            } else {
                this.button_rect.setFillColor(this.fillColor);
                this.label.setColor(this.textColor);
            }
        }
        this.previously_clicking = clicking;
        this.button_rect.draw();
        if ((this.text !== null)) {
            this.label.draw();
        }
    }
    clicked() {
        return this._clicked;
    }
    reset() {
        this._clicked = false;
    }
}

class Selector extends object {
    constructor(window, pos = [0, 0], choices = util.range(10), fillColor = "White", hoverFillColor = "Grey", clickFillColor = "Black", textColor = "Black", hoverTextColor = "White", clickTextColor = "White", borderColor = "Black", button_width = 1, button_height = 1, button_spacing = 0.5) {
        var button, x_pos;
        this.buttons = [];
        for (var i, _pj_c = 0, _pj_a = util.range(choices.length), _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
            i = _pj_a[_pj_c];
            x_pos = (((pos[0] - (((choices.length * button_width) + ((choices.length - 1) * button_spacing)) / 2.0)) + ((button_width + button_spacing) * i)) + (button_width / 2.0));
            button = new Button(window, {"pos": [x_pos, pos[1]], "text": choices[i].toString(), "width": button_width, "height": button_height, "fillColor": fillColor, "hoverFillColor": hoverFillColor, "clickFillColor": clickFillColor, "textColor": textColor, "hoverTextColor": hoverTextColor, "clickTextColor": clickTextColor, "borderColor": borderColor});
            this.buttons.push(button);
        }
        this.selection = null;
    }
    draw() {
        for (var button, _pj_c = 0, _pj_a = this.buttons, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
            button = _pj_a[_pj_c];
            button.draw();
            if ((button.clicked() && (this.selection === null))) {
                this.selection = button.text;
            }
        }
    }
    selectionMade() {
        return (this.selection !== null);
    }
    getSelection() {
        return this.selection;
    }
    reset() {
        this.selection = null;
        for (var button, _pj_c = 0, _pj_a = this.buttons, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
            button = _pj_a[_pj_c];
            button.reset();
        }
    }
}