import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';UserService

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
}
