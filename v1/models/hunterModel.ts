import { ObjectId } from "mongodb";

interface Address {
    street: string,
    number: string,
    neighborhood: string,
    city: string,
    state: string,
}

export default class Hunter {
    _id?: ObjectId;
    name: string;
    email: string;
    password: string;
    address: Address;
    constructor(name: string, email: string, password:string, address: Address, id?: ObjectId) {
        this._id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.address = address;
    }
}
