


class OverworldMap {
  constructor(config) {
    this.overworld = null;
    this.gameObjects = config.gameObjects;
    this.cutsceneSpaces = config.cutsceneSpaces || {};
    this.walls = config.walls || {};

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;

    this.isCutscenePlaying = false;

  
   
    


  }

  stopAudio() {
    this.currentAudio.pause();
  }

    
  

    // Add event listener to pause audio when another song starts playing

  
  drawLowerImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.lowerImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    )
  }

  drawUpperImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.upperImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    )
  }

  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  }

  mountObjects() {
    Object.keys(this.gameObjects).forEach(key => {

      let object = this.gameObjects[key];
      object.id = key;

      //check if object can mount
      object.mount(this);

    })
  }

  async startCutscene(events) {
    this.isCutscenePlaying = true;

    for (let i = 0; i < events.length; i++) {
      const eventHandler = new OverworldEvent({
        event: events[i],
        map: this,
      })
      await eventHandler.init();
    }

    this.isCutscenePlaying = false;

    //reset idle behavior
    Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))
  }

  checkForActionCutscene() {
    const hero = this.gameObjects["hero"];
    const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
    const match = Object.values(this.gameObjects).find(object => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
    });
    if (!this.isCutscenePlaying && match && match.talking.length) {
      this.startCutscene(match.talking[0].events)
    }
  }

  checkForFootstepCutscene() {
    const hero = this.gameObjects["hero"];
    const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
    if (!this.isCutscenePlaying && match) {
      this.startCutscene(match[0].events)
    }
  }

  addWall(x, y) {
    this.walls[`${x},${y}`] = true;
  }
  removeWall(x, y) {
    delete this.walls[`${x},${y}`]
  }
  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const { x, y } = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
  }
 
}

window.OverworldMaps = {
 
 
  
  Pirate: {
   
    lowerSrc: "../../images/maps/Pirates.png",
   upperSrc: "",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(45),
        y: utils.withGrid(26),

        
      }),
      TimePirate: new Person({
        x: utils.withGrid(45),
        y: utils.withGrid(27),
        src: "../../images/characters/captain_time.png",

        behaviorLoop: [
         
          { type: "stand", direction: "up", time: 300 },
          { type: "stand", direction: "left", time: 300 },
          { type: "stand", direction: "right", time: 400 },
          { type: "stand", direction: "up", time: 350 },
        ],
        talking: [
          {
            events: [
              { type: "textMessage", text: "W-who are you?!", faceHero: "TimePirate" },
              { type: "textMessage", text: "YARRR fill in the code Y.A.R.R to talk please", faceHero: "TimePirate" },
              
            ]
          }
        ]
      }),
      man: new Person({
        x: utils.withGrid(47),
        y: utils.withGrid(24),
        src: "../../images/characters/matroos_berend.png",

        behaviorLoop: [
         
          { type: "stand", direction: "up", time: 390 },
         
        ],
        talking: [
          {
            events: [
              { type: "textMessage", text: "hello", faceHero: "TimePirate" },
              { type: "textMessage", text: "what are you", faceHero: "man" },
              
            ]
          }
        ]
      }),
     
     
    
    
    
    
    },
    walls: {
      


   




   
    },
    cutsceneSpaces: {
      [utils.asGridCoord(50, 25)]: [
        {
          events: [
            { type: "changeMap", map: "onder" }
          ]
        }
      ],
      [utils.asGridCoord(51, 25)]: [
        {
          events: [
            { type: "changeMap", map: "onder" }
          ]
        }
      ]
    }
  

  },
  onder: {
   
    lowerSrc: "../../images/maps/onder.png",
   upperSrc: "",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(10),
        y: utils.withGrid(3),

        
      }),

    BerendOnder: new Person({
        x: utils.withGrid(17),
        y: utils.withGrid(9),
        src: "../../images/characters/matroos_berend.png",

     
        talking: [
          {
            events: [
              { type: "textMessage", text: "oh uhhhh here is the map ig" },
              { type: "textMessage", text: "take it to the captain and use the code:" },
              { type: "textMessage", text: "l.a.n.d.i.n.s.i.g.h.t" },
              
            ]
          }
        ]
      }),


      
    Bed1: new Person({
      x: utils.withGrid(35),
      y: utils.withGrid(9),
      src: "../../images/characters/map.png",

   
      talking: [
        {
          events: [
            { type: "textMessage", text: "Barbosa's bed?" },
            { type: "textMessage", text: "better not touch it" },
          
          ]
        }
      ]
    }),
  


    
    Bed2: new Person({
      x: utils.withGrid(27),
      y: utils.withGrid(2),
      src: "../../images/characters/map.png",

   
      talking: [
        {
          events: [
            { type: "textMessage", text: "oh that creep berend his bed" },
            { type: "textMessage", text: "better not get in" },
          
            
          ]
        }
      ]
    }),
  


    
   Bed3: new Person({
      x: utils.withGrid(29),
      y: utils.withGrid(15),
      src: "../../images/characters/map.png",

   
      talking: [
        {
          events: [
            { type: "textMessage", text: "Ahhhh the rusty visitors bed" },
            { type: "textMessage", text: "lets go sleep!" },
            { type: "textMessage", text: "use code s.l.e.e.p to get sleepin." },
            
          ]
        }
      ]
    }),
  
    
     
     
    
    
    
    
    },
    walls: {
      


   




   
    },
    cutsceneSpaces: {
      
      [utils.asGridCoord(9, 3)]: [
        {
          events: [
            { type: "changeMap", map: "Pirate" }
          ]
        }
      ]
    }
  

  },
  
  
}




