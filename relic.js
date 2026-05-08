export const RARITY = Object.freeze({
  COMMON: {label: "Common", color: "#b0b0b0", spawnWeight: 20},
  RARE: {label: "Rare", color: "#2196f3", spawnWeight: 10},
  EPIC: {label: "Epic", color: "#9c27b0", spawnWeight:  5},
  LEGENDARY: {label: "Legendary", color: "#ff9800", spawnWeight: 3},
  UNIQUE: {label: "Unique", color: "#d40e95", spawnWeight: 1}
});


class Relic {
  /**
   * @param {object} config
   * @param {string} config.id - Unique identifier ("fire_orb")
   * @param {string} config.name - Display name
   * @param {string} config.sprite - Path to sprite image
   * @param {string} config.rarity - Key from RARITY
   * @param {string} config.description - flavor text
   * @param {Function} config.ability  - function(player, context) called on activate
   */
  constructor({id, name, sprite, rarity, description = "", ability}) {
    this.id = id;
    this.name = name;
    this.sprite = sprite;
    this.rarity = RARITY[rarity];
    this.rarityKey = rarity;
    this.description = description;
    this.ability = ability;
    this.active = false;
  }

  static rollRandom(pool) {
    if (!pool || pool.length === 0) return null;
    const totalWeight = pool.reduce((s, r) => s + r.rarity.spawnWeight, 0);
    let roll = Math.random() * totalWeight;

    for (const relic of pool) {
      roll -= relic.rarity.spawnWeight;
      if (roll <= 0) return relic;
    }
  }

  static filterByRarity(pool, rarityKey) {
    return pool.filter((r) => r.rarityKey === rarityKey);
  }

  static rollAny() {
    return this.rollRandom(RELICS);
  }
}

export const RELICS = [
  new Relic({
    id: "slow_down",
    name: "Slow Down",
    sprite: "assets/relics/common_slowdown.png",
    rarity: "COMMON",
    description: "Slows the speed of pieces falling by 25%",
    ability(game) {
      game.slowed = this.active;
    },
  }),

  new Relic({
    id: "square^2",
    name: "Square squared",
    sprite: "assets/relics/common_squaresquared.png",
    rarity: "COMMON",
    description: "Each square piece placed grants +2 more bonus points than the last",
    ability(game) {
      game.sqrBonusActive = this.active;
    },
  }),

  new Relic({
    id: "rock_bottom",
    name: "Rock Bottom",
    sprite: "assets/relics/common_rockbottom.png",
    rarity: "COMMON",
    description: "Grants +20% score for pieces placed within the bottom 2 rows.",
    ability(game) {
      game.rockBottomActive = this.active;
    },
  }),

  new Relic({
    id: "score_multi",
    name: "Score Multi",
    sprite: "assets/relics/common_scoremulti.png",
    rarity: "COMMON",
    description: "Increases score by +5% per line cleared",
    ability(game) {
      game.scoreMultiActive = this.active;
    },
  }),
  new Relic({
      id: "cleaner",
      name: "Cleaner",
      sprite: "assets/relics/common_cleaner.png",
      rarity: "COMMON",
      description: "Performing a line clear that empties the board increases score gained by +100%",
      ability(game) {
        game.cleanerActive = this.active;
      },
    }),
  new Relic({
    id: "combo_line",
    name: "Combo Line",
    sprite: "assets/relics/rare_comboline.png",
    rarity: "RARE",
    description: "Every consecutive line clear gains +50% stacking score.",
    ability(game) {
      game.comboLineActive = this.active;
    },
  }),
  //not implemented
  new Relic({
    id: "tower_builder",
    name: "Tower Builder",
    sprite: "assets/relics/rare_towerbuilder.png",
    rarity: "RARE",
    description: "If the tower is above 60% of the board lines cleared grant +30% score.",
    ability(game) {
      game.towerBuilderActive = this.active;
    },
  }),

  new Relic({
    id: "spin_2_win",
    name: "Spin 2 Win",
    sprite: "assets/relics/rare_spin2win.png",
    rarity: "RARE",
    description: "Gain +2% score per full rotation of the piece that clears the line.",
    ability(game) {
      game.spin2WinActive = this.active;
    },
  }),
  new Relic({
    id: "turbo_booster",
    name: "Turbo Booster",
    sprite: "assets/relics/epic_turboboost.png",
    rarity: "EPIC",
    description: "Hard dropping a piece\nincreases score by +30%.",
    ability(game) {
      game.turboBoosterActive = this.active;
    },
  }),
  //not implemented
  new Relic({
    id: "holder",
    name: "Holder",
    sprite: "assets/relics/epic_holder.png",
    rarity: "EPIC",
    description: "Allows holding an extra piece.",
    ability(game) {
      game.doubleHoldActive = this.active;
    },
  }),
  new Relic({
    id: "tester",
    name: "Tester",
    sprite: "assets/relics/tester.png",
    rarity: "COMMON",
    description: "Test Active",
    ability(game) {
      console.log("e");
      game.scoreAdd = 50;
    },
  }),
  new Relic({
    id: "extra_firepower",
    name: "Extra Firepower",
    sprite: "assets/relics/epic_extrfirepower.png",
    rarity: "EPIC",
    description: "Clearing 4 lines at once clears the line above it as well",
    ability(game) {
      game.extraFirepowerActive = this.active;
    },
  }),
  new Relic({
    id: "bubble_up",
    name: "Bubble Up",
    sprite: "assets/relics/legendary_bubbleup-Sheet-export.png",
    rarity: "LEGENDARY",
    description: "Clearing 2+ lines causes consecutive lines with 9 tiles to clear as well (up to additional lines)",
    ability(game) {
      game.bubbleUpActive = this.active;
    },
  }),
  new Relic({
    id: "lets_go_gambling",
    name: "Let's Go Gambling!",
    sprite: "assets/relics/legendary_letsgogambling-Sheet-export.png",
    rarity: "LEGENDARY",
    description: "Getting 3 of the same piece in a row multiplies your score by 1.2x",
    ability(game) {
      game.letsGoGamblingActive = this.active;
    },
  }),
  new Relic({
    id: "duplicator",
    name: "Duplicator",
    sprite: "assets/relics/unique_duplicator-Sheet-export.png",
    rarity: "UNIQUE",
    description: "When used, duplicates the current piece to held item without consuming it",
    ability(game) {
      game.duplicatorActive = this.active;
    },
  }),
  new Relic({
    id: "thermonuclear",
    name: "Thermonuclear",
    sprite: "assets/relics/unique_thermonuclear-Sheet-export.png",
    rarity: "UNIQUE",
    description: "When used, activates a nuke that clears the bottom 3 rows of the board but grants no score",
    ability(game) {
      game.thermonuclearActive = this.active;
    },
  }),
  
];