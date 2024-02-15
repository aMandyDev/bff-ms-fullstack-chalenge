"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const boom_1 = __importDefault(require("@hapi/boom"));
const crypto_1 = __importDefault(require("crypto"));
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const moment_1 = __importDefault(require("moment"));
const loginWrapper = ({ config, loginRepository, }) => {
    const authentication = ({ payload, headers, onSuccess, onError, }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { app: { jwtTokenSecret } } = config;
            const { email, password } = payload;
            const hashPassword = crypto_1.default.createHash('md5').update(password).digest("hex");
            const hunter = yield loginRepository.authentication(email, hashPassword);
            if (!(hunter === null || hunter === void 0 ? void 0 : hunter.id) && !(hunter === null || hunter === void 0 ? void 0 : hunter.email)) {
                throw boom_1.default.forbidden('Acesso negado!!!');
            }
            const iat = parseInt((0, moment_1.default)().format('x'), 10);
            const exp = parseInt((0, moment_1.default)().add(1, 'days').format('x'), 10);
            const token = jwt_simple_1.default.encode(Object.assign(Object.assign({}, hunter), { iat, exp }), jwtTokenSecret, 'HS256');
            return onSuccess({
                hunterId: hunter === null || hunter === void 0 ? void 0 : hunter.id,
                token,
            });
        }
        catch (errorCatch) {
            return onError(errorCatch);
        }
    });
    return {
        authentication,
    };
};
module.exports = loginWrapper;
//# sourceMappingURL=index.js.map