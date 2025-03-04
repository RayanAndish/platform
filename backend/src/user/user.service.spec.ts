// src/user/user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

describe('UserService', () => {
  let userService: UserService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(), // Mock the findOne method
            create: jest.fn(),   // Mock the create method
            // ... (Add other mocked methods as needed)
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should find a user by username', async () => {
    const mockUser = { username: 'testuser', password: 'password', email: 'test@example.com' };
    jest.spyOn(userModel, 'findOne').mockResolvedValue(mockUser); // Mock findOne return value

    const result = await userService.findOneByUsername('testuser');
    expect(result).toEqual(mockUser);
  });

  it('should create a new user', async () => {
    const createUserDto = { username: 'newuser', password: 'password', email: 'new@example.com' };
    jest.spyOn(userModel, 'create').mockImplementation(() => Promise.resolve(createUserDto as any));

    const result = await userService.create(createUserDto);
    expect(result).toEqual(createUserDto);
  });

  // Add more unit tests
});