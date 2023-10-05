import { Controller, Post, HttpCode, HttpStatus, Body, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from 'src/_helper/decorator/user.decorator';
import { User } from '../_database/_entity/user/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    
    @Post('sign-in')
    @UseGuards(LocalAuthGuard)
    singIn(@CurrentUser() { user }: { user: User }) {
        return this.authService.signIn(user)
    }

    @Post('sign-up')
    @UseGuards(JwtAuthGuard)
    singUp(@Body() user: User) {
        return this.authService.signUp(user)
    }

    @Post('forgot-password')
    forgotPassword(@Body() user:User){
        return this.authService.forgotPassword(user)
    }

    @UseGuards(JwtAuthGuard)
    @Post('reset-password')
    resetPassword(@Body() @Body() { user, password, confirm } : { user: User, password: string, confirm:string}){
        return this.authService.resetPassword(user, password, confirm)
    }
}
