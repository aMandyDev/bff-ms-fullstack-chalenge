import Boom from '@hapi/boom';
import crypto from 'crypto';
import jwt from 'jwt-simple';
import moment from "moment";

interface LoginRepository {
    authentication: {
    (email: string, password: string): void
  },
}

interface LoginWrapper {
    authentication(options: {
    payload: any;
    headers: any;
    onSuccess: (response: any) => any;
    onError: (error: any) => any;
  }): Promise<any>;
}

const loginWrapper = ({
    config,
    loginRepository,
}: {
  loginRepository: LoginRepository,
  config: any,
}): LoginWrapper => {
  const authentication = async ({
    payload,
    headers,
    onSuccess,
    onError,
  }: {
    payload: any;
    headers: any;
    onSuccess: (response: any) => any;
    onError: (error: any) => any;
  }): Promise<any> => {
    try {
      const { app: { jwtTokenSecret } } = config;
      const { email, password } = payload;
      const hashPassword = crypto.createHash('md5').update(password).digest("hex");
      const hunter:any = await loginRepository.authentication(email, hashPassword);
      if (!hunter?.id && !hunter?.email) {
        throw Boom.forbidden('Acesso negado!!!');
      }
      const iat = parseInt(moment().format('x'), 10);
      const exp = parseInt(moment().add(1, 'days').format('x'), 10);
      const token = jwt.encode({ ...hunter, iat, exp,  }, jwtTokenSecret, 'HS256');
      return onSuccess({
        hunterId: hunter?.id,
        token,
      });
    } catch (errorCatch: any) {
      return onError(errorCatch);
    }
  };

  return {
    authentication,
  };
};

export = loginWrapper;
