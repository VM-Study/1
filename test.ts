
// Вариант 1: С Интерфейсом User
import {prop} from '@typegoose/typegoose';
import {UserModel} from './src/utils/modules/user/user.entity';

interface User {
  name: string,
  email: string,
  password: string,
  age: number
}

// для логина нужно email и password и еще прилетают какие то спец поля someData1
class LoginUserDto {
  public email: string;
  public password: string;
  public someData1: string;
}

// для создания логина нужно name и email и password и еще прилетают какие то спец поля someData2
class CreateUserDto {
  public name: string;
  public email: string;
  public password: string;
  public someData2: string;
}

class UserEntity1 implements User {
  @prop({required: true})
  public name: string;

  @prop({unique: true, required: true})
  public email: string;

  @prop({required: true})
  public password: string;

  @prop({required: false})
  public age: number;

  constructor(userData: User) {
    this.name = userData.name;
    this.email = userData.email;
    this.password = userData.password;
    this.age = userData.age || 0;
  }
}

class DefaultUserService {
  create(dto: CreateUserDto) {
    const userEntityData: User = {
      name: dto.name,
      email: dto.email,
      password: dto.password,
      age: 0
    };
    const user = new UserEntity1(userEntityData);

    return UserModel.create(user);
  }
}

// ---------------------------------------------
// Вариант 2: Без Интерфейса User
class UserEntity2 {
  @prop({required: true})
  public name: string;

  @prop({unique: true, required: true})
  public email: string;

  @prop({required: true})
  public password: string;

  @prop({required: false})
  public age: number;

  constructor(name: string, email: string, password: string, age: number = 0) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.age = age;
  }
}

class DefaultUserService {
  create(dto: CreateUserDto): Promise<UserEntity2> {
    const { name, email, password } = dto;
    const user = new UserEntity2(name, email, password);

    return UserModel.create(user);
  }
}
