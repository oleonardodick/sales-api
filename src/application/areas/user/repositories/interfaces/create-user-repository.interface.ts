export abstract class CreateUserInteface {
  abstract create(name: string, email: string, password: string): Promise<void>;
}
