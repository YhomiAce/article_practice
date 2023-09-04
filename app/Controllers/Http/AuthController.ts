import Hash from "@ioc:Adonis/Core/Hash";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import LoginValidator from "App/Validators/LoginValidator";
import RegisterValidator from "App/Validators/RegisterValidator";

export default class AuthController {
  public async register({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator);
    const hashedPassword = await Hash.make(payload.password);
    const user = await User.create({ ...payload, password: hashedPassword });
    const token = await auth.use("api").login(user, {
      expiresIn: "1h",
    });

    return response
      .status(201)
      .send({ data: user, token: token.toJSON(), status: 201 });
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(LoginValidator);
    const token = await auth
      .use("api")
      .attempt(payload.email, payload.password, {
        expiresIn: "1h",
      });
    return response
      .status(200)
      .json({ success: true, token: token, user: auth.user });
  }
}
