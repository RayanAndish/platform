// src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthGuard } from './auth.guard';  // Create this guard
import { Public } from './decorators/public.decorator'; // Import the decorator

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public() //  This endpoint is public (no authentication required)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
  @Public() //  This endpoint is public (no authentication required)
  @Post('login')
  async login(@Body() loginDto: any) { // Create a DTO for login
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard) // Protect the route with the AuthGuard
  @Get('profile')
  getProfile(@Req() req: any) {
    //  Access user information from the request
    return req.user;
  }
}