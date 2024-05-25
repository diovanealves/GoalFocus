import { UserPayload } from "@/lib/current-user-decorator";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh",
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField("refresh"),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UserPayload) {
    return { id: payload.sub, email: payload.email };
  }
}
