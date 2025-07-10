let game;
const myCanvas = document.getElementById("canvas");
const msg = document.getElementById("msg");
const ctx = myCanvas.getContext("2d");
let [maxWidth,maxHeight] = [myCanvas.width,myCanvas.height];
let paletteCtr = 0
let lvlCleared = false;


let palette = [
    "rgb(255,219,219)",
    "rgb(253,253,253)",
    "rgb(201,255,199)",
    "rgb(209,201,255)",
    "rgb(209,201,255)"
]

class Platform{
    constructor(x,y,w,h,id=null){
        this.x = x * platformSize;
        this.y = (maxHeight-(y+1)*platformSize);
        this.w = w * platformSize;
        this.h = h * platformSize;
        this.id = id
    }
}



class Group{
    static groupList = [];
    static defaultColor = "cyan"
    static add(t) {
        Group.groupList.push(t)
    }

    static finishLevel(){
        this.defaultColor = "lime"
        this.resetColor()
    }

    static resetColor(){
        for(let group of Group.groupList){
            group.color = Group.defaultColor;
        }
    }

    static find(id){
        for(let group of Group.groupList){
            if(group.id == id){
                return group
            }
        }
    }

    constructor(coords,x,y,scale){
        this.data = coords
        this.coords = [];
        this.color = "cyan"
        this.id = String(Math.random())
        this.scale = scale;
        this.setter(x,y)
        Group.add(this)
    }

    setter(x,y){
        this.coords = []
        for(let coord of this.data){
            this.coords.push(new Platform(coord[0] * this.scale + x,
                coord[1] * this.scale + y,
                coord[2] * this.scale,
                coord[3] * this.scale,
                this.id
            ))
        }

        return this
    }
}

let letterScale = 1;

let letterData = {
    "H":[
        [0,4,1,5],
        [4,4,1,5],
        [1,2,3,1],
    ],
    "A":[
        [1,4,3,1],
        [1,2,3,1],
        [0,3,1,4],
        [4,3,1,4],
    ],
    "P":[
        [0,4,5,1],
        [0,2,5,1],
        [4,3,1,1],
        [0,3,1,1],
        [0,1,1,2]

    ],
    "Y":[
        [2,2,1,3],
        [0,4,1,1],
        [4,4,1,1],
        [3,3,1,1],
        [1,3,1,1]

    ],
    "F":[
        [0,4,5,1],
        [0,2,5,1],
        [0,1,1,2],
        [0,3,1,1],

    ],
    "E":[
        [0,0,5,1],
        [0,2,5,1],
        [0,4,5,1],
        [0,3,1,1],
        [0,1,1,1],


    ],
    "R":[
        [0,4,4,1],
        [0,2,4,1],
        [0,3,1,1],
        [0,1,1,2],
        [4,1,1,2],
        [4,3,1,1],
    ],
    "T":[
        [0,12,5,1],
        [1,11,3,1],
        [2,10,1,11],
        [1,9,1,9],
        [3,9,1,9],
        [0,5,1,3],
        [4,5,1,3],


    ],
    "HOUSE":[
        [1,4,1,5],
        [5,4,1,5],
        [2,2,3,1],
        [0,5,7,1],
        [1,6,5,1],
        [2,7,3,1],

    ],
    "D":[
        [0,0,4,1],
        [0,4,4,1],
        [4,3,1,3],
        [0,3,1,3],


    ],
    "S":[
        [0,0,4,1],
        [1,2,3,1],
        [1,4,4,1],
        [0,3,1,1],
        [4,1,1,1],
        [4,1,1,1],
    ],
    "'":[
        [0,1,1,2]
    ],
    "CASE":[
        [0,6,11,1],
        [0,5,4,1],
        [7,5,4,1],
        [0,3,4,1],
        [7,3,4,1],
        [0,2,11,3],
        [3,8,5,1],
        [3,7,1,1],
        [7,7,1,1],
    ],
    "STACHE":[
        [5,3,3,1],
        [9,3,3,1],
        [0,2,1,1],
        [16,2,1,1],
        [3,2,11,1],
        [1,1,7,1],
        [9,1,7,1],
        [2,0,5,1],
        [10,0,5,1],

        
    ]
}


let level = 1;
let platformSize = 100/4;
let gapY = 3

let finishArea = {
    x:maxWidth-25*7,
    y:maxHeight-25*3,
    w:2*25,
    h:3*25,
}

let levels = [
    [  
        ...new Group(letterData["H"],2,maxHeight/platformSize - gapY*2 -3,1).coords,
        ...new Group(letterData["A"],2 + (15) ,maxHeight/platformSize - gapY*3-3,1).coords,
        ...new Group(letterData["P"],2 + (15) * 2,maxHeight/platformSize - gapY*4-3,1).coords,
        ...new Group(letterData["P"],2 + (15) * 3,maxHeight/platformSize - gapY*5-3,1).coords,
        ...new Group(letterData["Y"],2 + (15) * 4,maxHeight/platformSize - gapY*6-3,1).coords,
        ...new Group(letterData["F"],2,maxHeight/platformSize - gapY*6-7,1).coords,
        ...new Group(letterData["A"],2 + (10),maxHeight/platformSize - gapY*7-7,1).coords,
        ...new Group(letterData["T"],2 + 10 * 2,maxHeight/platformSize - gapY*11+1-7,1).coords,
        ...new Group(letterData["HOUSE"],10 * 3,maxHeight/platformSize - gapY*10-7,1).coords,
        ...new Group(letterData["E"],2 + 10 * 4,maxHeight/platformSize - gapY*10-7,1).coords,
        ...new Group(letterData["R"],2 + 10 * 5,maxHeight/platformSize - gapY*11-7,1).coords,
        ...new Group(letterData["'"],2 + 10 * 6 - 3,maxHeight/platformSize - gapY*10 +2-7,1).coords,
        ...new Group(letterData["S"],2 + (10) * 6,maxHeight/platformSize - gapY*12-7,1).coords,
        ...new Group(letterData["D"],2,maxHeight/platformSize - gapY*14-3,2).coords,
        ...new Group(letterData["A"],2 + 28 * 1,maxHeight/platformSize - gapY*16-3,2).coords,
        ...new Group(letterData["Y"],2 + 28  * 2,maxHeight/platformSize - gapY*19-3,2).coords,
        ...new Group(letterData["CASE"],2 + 13,maxHeight/platformSize - gapY*17-3,1).coords,
        ...new Group(letterData["STACHE"],2 + 13 * 3 -1,maxHeight/platformSize - gapY*18-3,1).coords,

        // ...new Group(letterData["cASE"],0.0,2).coords,

        




    ]
];

function loadPlatform(){
    for(let i of levels[level-1]){
        ctx.fillStyle = Group.find(i.id).color;
        ctx.fillRect(i.x,i.y,i.w,i.h)
    }
    ctx.fillStyle = "lime";
    ctx.fillRect(finishArea.x,finishArea.y,finishArea.w,finishArea.h)
}
function boxCollision(player, box){
    return ((player.y >= box.y - player.h &&
    player.y + player.h <= box.y + box.h &&
    player.x < box.x + box.w &&
    player.x + player.w > box.x)
    ||
    (player.y > box.y &&
    player.y < box.y + box.h &&
    player.x < box.x + box.w &&
    player.x + player.w > box.x))
}


class Player{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.xPrev = x;
        this.yPrev = y;
        this.w = w;
        this.h = h;
        this.xvel = 0;
        this.yvel = 0;
        this.xacc = 0;
        this.yacc = 0;
        this.LEFT = false;
        this.RIGHT = false;
        this.move = ""
        this.movePrev = ""
        this.mMax = 7;
        this.jumpF = 8;
        this.fricF = 0.5;
        this.moveF = 0.5
        this.isColY = false;
        this.boxCollision = null;
    }

    render(){
        ctx.fillStyle = "green";
        ctx.fillRect(this.x,this.y,this.w,this.h);
    }

    main(){
        //acceleration
        this.yacc = 0.5
        if(!this.isColY){
            this.yvel += this.yacc;
        }else{
            this.yacc = 0
        }

        this.xvel += this.xacc;

        //taking previous position for collision
        this.xPrev = this.x;
        this.yPrev = this.y;

        //velocity
        this.y += this.yvel
        this.x += this.xvel;

        this.collision();

        this.movement()
    }

    movement(){
        switch(this.move){
            case "right":
                this.xacc = this.moveF;
                if(this.xvel >= this.mMax){
                    this.xacc = 0
                }
                break;

            case "left":
                this.xacc = -this.moveF;
                if(this.xvel <= -this.mMax){
                    this.xacc = 0
                }
                break;

            case "":
                switch(this.movePrev){
                    case "right":
                        this.xacc = -this.fricF;
                        if(this.xvel <= 0){
                            this.xvel = 0;
                            this.xacc = 0
                        }
                        break;

                    case "left":
                        this.xacc = this.fricF;
                        if(this.xvel >= 0){
                            this.xvel = 0;
                            this.xacc = 0;
                        }
                        break;
                }
                
                break;  
        }
    }

    die(){
        this.x = 50;
                        this.y = 0;
                        Group.resetColor()
    }

    collision(){
        this.isColY = false
        
        //left off here
        if(this.y >= maxHeight - this.h){
            // this.y = maxHeight - this.h;
            this.die()
            this.yvel = 0;
            this.isColY = true;
            msg.innerHTML = "BLOCK FELL OUT OF THE WORLD"
        }

        for(let platform of levels[level-1]){   
            if(boxCollision(this,platform)){
                if(platform.id){
                    Group.find(platform.id).color = palette[paletteCtr % 5]
                    paletteCtr++;
                }
                if(boxCollision({...this,x:this.xPrev,y:this.yPrev + Math.abs(this.yvel)},platform)){
                    // console.log("up")
                    if(this.yvel >= 18){
                        this.die()
                        msg.innerHTML = "BLOCK SUFFERED FALL DAMAGE"
                    }else{
                        this.y = platform.y - this.h;
                    }
                    this.yvel = 0;
                    this.isColY = true;
                    
                }
                else if(boxCollision({...this,x:this.xPrev,y:this.yPrev - Math.abs(this.yvel)},platform)){
                    // console.log("down")
                    this.y = platform.y + platform.h
                    this.yvel = 0;
                }
                else if(boxCollision({...this,x:this.xPrev + Math.abs(this.xvel),y:this.yPrev},platform)){
                    // console.log("left");
                    this.x = platform.x - this.w;
                    this.xvel = 0;
                    
                }
                else if(boxCollision({...this,x:this.xPrev - Math.abs(this.xvel),y:this.yPrev},platform)){
                    // console.log("right")
                    this.x = platform.x + platform.w;
                    this.xvel = 0;
                }
               
            }
        }


        if(this.x < 0){
            // this.xvel = 0;
            this.x = maxWidth - this.h;
        }

        if(this.x + this.h > maxWidth){
            // this.xvel = 0;   
            this.x = 0;
        }

        if(boxCollision(this,finishArea)){
            console.log("FINISHED")
            if(this.yvel >=18){
                this.die()
                msg.innerHTML = "BLOCK SUFFERED FALL DAMAGE"
            }else{
                Group.finishLevel();
                this.yacc = 0;
                this.xacc = 0;
                this.yvel = 0;
                this.xvel = 0;
                msg.innerHTML = "LEVEL COMPLETED!"
                lvlCleared = true;

            }
        }
    }
}



let p1 = new Player(50,0,25,25)


function render(){
    ctx.fillStyle = "black"
    
    
    ctx.fillRect(0,0,maxWidth,maxHeight);
    
    ctx.fillStyle = "white"
    ctx.font = "12px arial"
    

    for(let i = 0; i < maxWidth * 100/platformSize; i++){
        ctx.fillRect(i * platformSize,0,1,maxHeight);
    }
    for(let i = 0; i < maxHeight * 100/platformSize; i++){
        
        ctx.fillRect(0,i*platformSize,maxWidth,1)
    }

    p1.render();
    loadPlatform();


}

let x = 0;
function main(){
    render();
    if(!lvlCleared){
        p1.main();
    }
} 

addEventListener("keydown", (e) => {

    if(p1.move == ""){
        switch(e.key){
            case "d":
                p1.move = "right"
                break;
            case "a":
                p1.move = "left"
                break;
            
        }
    }

    if(e.key == "w" && p1.isColY){
        console.log("HII")
        p1.yvel = -p1.jumpF;
    }
})


addEventListener("keyup", (e) => {
    if(e.key == "d" || e.key == "a"){
        p1.movePrev = p1.move
        p1.move = ""
    }
})

game = setInterval(main, 1000/60)
Group.find()