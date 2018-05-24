"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AutoAnchor = /** @class */ (function () {
    function AutoAnchor() {
        var _this = this;
        this.html = '';
        this.match = null;
        this.piece = '';
        this.items = document.querySelectorAll('[data-autoanchor]');
        if (!this.items.length)
            return;
        Array.from(this.items).forEach(function (item) { return _this.autoAnchor(item); });
    }
    AutoAnchor.prototype.getLinkedText = function (text) {
        var a = document.createElement('a');
        a.href = text;
        a.target = '_blank';
        a.textContent = text;
        return a;
    };
    AutoAnchor.prototype.autoAnchor = function (item) {
        this.html = item.innerHTML;
        if (!this.html)
            return;
        item.innerHTML = '';
        while (this.html) {
            this.match = this.html.match(/(https?:\/\/(([\w\-_\.]+)\.([a-z]+))([\/\?#][^\s,,(){}<>"”’]*)?)/i);
            this.index = this.match ? this.match.index : this.html.length;
            this.piece = this.html.substring(0, this.index);
            if (!this.piece && this.match) {
                this.index = this.match[1].length;
                this.piece = this.getLinkedText(this.match[1]);
                item.appendChild(this.piece);
            }
            else {
                item.innerHTML += this.piece;
            }
            this.html = this.html.slice(this.index);
        }
    };
    return AutoAnchor;
}());
exports.default = AutoAnchor;
