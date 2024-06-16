import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt  } from 'passport-jwt';

@Injectable()
export class MockJwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      ignoreExpiration: true, 
      secretOrKey: 'secretKey',
    });
  }

  async validate(payload: any) {
    return { userId: 1, username: 'testuser' }; 
  }
}