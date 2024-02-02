
// Вариант 1: С Интерфейсом User
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
  public name: string;
  public email: string;
  public password: string;
  public age: number;

  constructor(userData: User) {
    this.name = userData.name;
    this.email = userData.email;
    this.password = userData.password;
    this.age = userData.age || 0;
  }
}

class DefaultUserService1 {
  static create(dto: CreateUserDto) {
    const userEntityData: User = {
      name: dto.name,
      email: dto.email,
      password: dto.password,
      age: 0
    };
    const user = new UserEntity1(userEntityData);
    console.log(user);
  }
}

// есть дто с данными
const createUserDto1 = {
  name: 'Alice',
  email: 'alice@example.com',
  password: 'alice2024',
  someData2: 'дополнительные данные'
};

DefaultUserService1.create(createUserDto1);
/*
  UserEntity1 {
    name: 'Alice',
    email: 'alice@example.com',
    password: 'alice2024',
    age: 0
  }
*/


// -----------------------------------------------------------
// Вариант 2: Без Интерфейса User
class UserEntity2 {
  public name: string;
  public email: string;
  public password: string;
  public age: number;

  constructor(name: string, email: string, password: string, age: number = 0) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.age = age;
  }
}

class DefaultUserService2 {
  static create(dto: CreateUserDto): void {
    const { name, email, password } = dto;
    const user = new UserEntity2(name, email, password);
    console.log(user);
  }
}

// есть дто с данными
const createUserDto2 = {
  name: 'Alice',
  email: 'alice@example.com',
  password: 'alice2024',
  someData2: 'дополнительные данные'
};
DefaultUserService2.create(createUserDto2);
/*
  UserEntity2 {
    name: 'Alice',
    email: 'alice@example.com',
    password: 'alice2024',
    age: 0
  }
 */
