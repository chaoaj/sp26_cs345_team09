class Box {
    Constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    LoadSprite(color) {
        if(typeof color === 'string' )
            try {
                this.sprite = LoadImage("assets/tile_" + color + ".png");
            }catch(ign){}
    }
}

class Piece {
    Constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        switch (type) {
            //add builds for all pieces
            case "4Line" : break; 
            case "L" : break;
            case "T" : break;
            case "Z" : break;
            case "S" : break;
            case "2by2" : break;
            case "BackL" : break;
        }
    }
}