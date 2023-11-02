import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy/jwt.strategy';


@Module({
  imports: [
    JwtModule.register({
      secret: 'node35',
      signOptions: {expiresIn: "5y"}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
//yarn add @nestjs/passport passport passport-local @nestjs/jwt passport-jwt @types/passport-jwt