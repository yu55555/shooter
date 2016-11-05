function Explode() {

    "use strict";

    this.engaged = false;

    if (Explode.img) {
        this._engage(Explode.img);
    } else {
        var img = new Image();
        var self = this;
        img.onload = function() {
            Explode.img = img;
            self._engage(img);
        };
        // http://darkcodeddata.deviantart.com/art/Fire-Adept-180018860
        img.src = 'fire_adept_by_darkcodeddata-d2z6ffw.png';
    }
}

Explode.prototype._engage = function(img) {

    "use strict";

    var sw = img.width/5;
    var sh = img.height/6;
    var uvs = [];
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 5; j++) {
            uvs.push({ u: j*sw, v: i*sh });
        }
    }
    var scale = 1.0;
    var dw = scale*sw, dh = scale*sh;

    var index, start;

    this.reset = function() {
        index = 0;
        start = Date.now();
    };
    this.reset();

    this.draw = function(ctx, x, y) {
        var sx = uvs[index].u, sy = uvs[index].v;
        ctx.drawImage(img, sx, sy, sw, sh, x - dw/2, y - dh/2, dw, dh);
    };

    var span = 32; // ms

    this.update = function() {
        var dt = Date.now() - start;
        var nextIndex = 0|dt/span;
        if (uvs.length - 1 <= nextIndex) {
            return false;
        }
        index = nextIndex;
        return true;
    };

    this.engaged = true;
};
