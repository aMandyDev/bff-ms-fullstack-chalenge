import { ObjectId } from "mongodb";

export default class Whitelist {
    _id?: ObjectId;
    email: string;
    
    constructor(email: string, id?: ObjectId) {
        this._id = id;
        this.email = email;
    }
}
