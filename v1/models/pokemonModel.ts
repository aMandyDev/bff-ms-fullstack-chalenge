import { ObjectId } from "mongodb";

export default class pokemon {
    _id?: ObjectId;
    hunterId: string;
    name: string;
    number: string;
    height: Number;
    weight: Number;
    image: string;
    captured: string;
    types: []
    abilities: []

    constructor(
        hunterId: string,
        name: string,
        number: string,
        height: Number,
        weight: Number,
        image: string,
        captured: string,
        types: [],
        abilities: [],
        id?: ObjectId
        ) {
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
