"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class pokemon {
    constructor(hunterId, name, number, height, weight, image, captured, types, abilities, id) {
        this._id = id;
        this.hunterId = hunterId;
        this.name = name;
        this.number = number;
        this.height = height;
        this.weight = weight;
        this.image = image;
        this.captured = captured;
        this.types = types;
        this.abilities = abilities;
    }
}
exports.default = pokemon;
//# sourceMappingURL=pokemonModel.js.map