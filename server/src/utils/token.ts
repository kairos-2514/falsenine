import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";


export interface AccessTokenPayload extends JwtPayload {
  customerId: string;
}

export interface RefreshTokenPayload extends JwtPayload {
  customerId: string;
}



export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};



export const createAccessToken = (
  payload: AccessTokenPayload,
  secret: string,
  expiresIn = "15m"
): string => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const createRefreshToken = (
  payload: RefreshTokenPayload,
  secret: string,
  expiresIn = "7d"
): string => {
  return jwt.sign(payload, secret, { expiresIn });
};



export const verifyAccessToken = (
  token: string,
  secret: string
): AccessTokenPayload | null => {
  try {
    return jwt.verify(token, secret) as AccessTokenPayload;
  } catch {
    return null;
  }
};

export const verifyRefreshToken = (
  token: string,
  secret: string
): RefreshTokenPayload | null => {
  try {
    return jwt.verify(token, secret) as RefreshTokenPayload;
  } catch {
    return null;
  }
};


export const decodeAccessToken = (token: string): AccessTokenPayload | null => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded || typeof decoded === "string") return null;
    return decoded as AccessTokenPayload;
  } catch {
    return null;
  }
};

export const hashRefreshToken = async (token: string): Promise<string> => {
  return bcrypt.hash(token, 10);
};

export const rotateTokens = (
  accessPayload: AccessTokenPayload,
  refreshPayload: RefreshTokenPayload,
  accessSecret: string,
  refreshSecret: string
) => {
  return {
    accessToken: createAccessToken(accessPayload, accessSecret),
    refreshToken: createRefreshToken(refreshPayload, refreshSecret),
  };
};
