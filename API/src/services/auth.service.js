const { isEmpty } = require("./../utils/isEmpty.util");
const { HttpExceptionBadRequest } = require("./../exception/httpException");
const UserRepository = require("./../repositories/user.repository");
const PasswordHasher = require("./../utils/passwordHasher.util");
const { USER_ID } = require("./../config/constant");
const UserRoleRepository = require("./../repositories/useRole.repository");
const UserSessionRepository = require("./../repositories/userSession.repository");
const { StatusCodes: status } = require("http-status-codes");
const { apiResponse } = require("./../utils/apiResponse.util");
const {
  generateRefreshToken,
  generateAccessToken,
  verifyRefreshToken,
} = require("./../utils/jwt.util");
const UserSession = require("./../models/userSession.model");

class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
    this.userRoleRepository = new UserRoleRepository();
    this.userSessionRepository = new UserSessionRepository();
  }

  async userRegister(payload) {
    // check if there are no payload
    if (isEmpty(payload))
      throw new HttpExceptionBadRequest("Empty data. Please fill the form");

    // check is email there is same email exist
    const findUserWithEmail =
      await this.userRepository.findUserByEmailAndDeletedNull(payload);

    // if email exist, give alert
    if (findUserWithEmail)
      throw new HttpExceptionForbidden("Email already registered");

    // check is username exist
    const findUserWithUsername =
      await this.userRepository.findUserByUsernameAndDeletedNull(payload);

    // if username exist, give alert
    if (findUserWithUsername)
      throw new HttpExceptionForbidden("Username already registered");

    // hashing pw
    const hashed = await PasswordHasher.hashPassword(payload.password);

    const userPayload = {
      email: payload.email.toLocaleLowerCase(),
      full_name: payload.full_name,
      password: hashed,
      user_name: payload.user_name,
    };

    const newUser = await this.userRepository.createUser(userPayload);
    const userRolePayload = {
      user_id: newUser.id,
      role_id: USER_ID,
    };

    await this.userRoleRepository.createUserRole(userRolePayload);

    return apiResponse(
      status.CREATED,
      "SUCCESS",
      "Success created a new account"
    );
  }

  userLogin = async (userData) => {
    // check data from requiest
    if (isEmpty(userData))
      throw new HttpExceptionBadRequest("Empty data. Please fill the form");

    // is email have registerd
    const findUser = await this.userRepository.findUserByEmail(userData);

    if (!findUser)
      throw new HttpExceptionForbidden(
        "Invalid email and password combination"
      );

    if (findUser.password === null)
      throw new HttpExceptionForbidden("Your Password Is Null");

    // password check from db and request '
    const isPasswordValid = await PasswordHasher.comparePassword(
      userData.password,
      findUser.password
    );

    if (!isPasswordValid)
      throw new HttpExceptionForbidden(
        "Invalid email and password combination"
      );

    // if there are user id with active user, will give access token and refresh token
    const findSession = await this.userSessionRepository.findSessionByUserId(
      findUser.id
    );

    // if there is session, will give status expired
    if (findSession) {
      await findSession.update({ status: "EXPIRED" });
    }

    const sessionPayload = {
      user_id: findUser.id,
      status: "ACTIVE",
      access_token: "Empty",
      refresh_token: "Empty",
    };

    // make new session again for handling security
    const newSession = await this.userSessionRepository.createUserSession(
      sessionPayload
    );

    const payloadToken = {
      user_id: findUser.id,
      role_id: findUser.user_role.role_id,
      session_id: newSession.id,
    };

    // generate token
    const refreshToken = generateRefreshToken(payloadToken);
    const accessToken = generateAccessToken(payloadToken);

    newSession.access_token = accessToken;
    newSession.refresh_token = refreshToken;

    // save refresh token to db
    await newSession.save();

    const token = {
      refresh_token: refreshToken,
      access_token: accessToken,
    };

    return token;
  };

  tokenRefresh = async (access_token) => {
    try {
      if (isEmpty(access_token))
        throw new HttpException(
          status.UNAUTHORIZED,
          "UNAUTHORIZED",
          "Refresh token doesn't exist"
        );

      // is refresh token valid and active
      const storedSession =
        await this.userSessionRepository.findSessionByAccToken(access_token);

      if (!storedSession)
        throw new HttpExceptionForbidden(
          "Invalid Access Token. Please login again"
        );

      // verify refresh token (expired and secret key)
      const verifiedToken = verifyRefreshToken(storedSession.refresh_token);

      if (!verifiedToken) {
        // update status to expired
        await UserSession.update(
          { status: "EXPIRED" },
          { where: { refresh_token: storedSession.refresh_token } }
        );
        throw new HttpExceptionForbidden(
          "Expired Refresh token. Please login again"
        );
      }

      // check user exist
      const findUser = await this.userRepository.findUserById(
        verifiedToken.user_id
      );
      if (!findUser) throw new HttpExceptionNotFound("User Not Found");

      const payloadToken = {
        user_id: verifiedToken.user_id,
        role_id: findUser.user_role.role_id,
        session_id: verifiedToken.session_id,
      };

      // create new access token
      const newAccessToken = generateAccessToken(payloadToken);

      // update new acces token in table user session
      await UserSession.update(
        { access_token: newAccessToken },
        { where: { refresh_token: storedSession.refresh_token } }
      );

      const token = {
        access_token: newAccessToken,
        refresh_token: storedSession.refresh_token,
      };

      return token;
    } catch (err) {
      const error = err;
      if (error.name === "TokenExpiredError") {
        // update status to expired
        await UserSession.update(
          { status: "EXPIRED" },
          { where: { refresh_token: refreshToken } }
        );
        throw new HttpException(
          status.UNAUTHORIZED,
          "UNAUTHORIZED",
          "Token expired. Please login again."
        );
      }

      throw apiResponse(
        error.code || status.INTERNAL_SERVER_ERROR,
        error.status || "INTERNAL_SERVER_ERROR",
        error.message
      );
    }
  };
}

module.exports = AuthService;
