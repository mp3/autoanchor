"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AutoLink = /** @class */ (function () {
    function AutoLink() {
        var _this = this;
        this.html = null;
        this.match = null;
        this.piece = '';
        this.items = document.querySelectorAll('[data-autolink]');
        if (!this.items.length)
            return;
        Array.from(this.items).forEach(function (item) { return _this.autoLink(item); });
    }
    AutoLink.prototype.getLinkedText = function (text) {
        var a = document.createElement('a');
        a.href = text;
        a.target = '_blank';
        a.textContent = text;
        return a;
    };
    AutoLink.prototype.autoLink = function (item) {
        this.html = item.textContent;
        if (!this.html)
            return;
        item.textContent = '';
        while (this.html) {
            this.match = this.html.match(/(https?:\/\/(([\w\-_\.]+)\.([a-z]+))([\/\?#][^\s,,(){}<>"”’]*)?)/i);
            this.index = this.match ? this.match.index : this.html.length;
            this.piece = this.html.substring(0, this.index);
            if (!this.piece && this.match) {
                this.index = this.match[1].length;
                this.piece = this.getLinkedText(this.match[1]);
            }
            item.textContent += this.piece;
            this.html = this.html.slice(this.index);
        }
        this.html = '';
    };
    return AutoLink;
}());
exports.default = AutoLink;
