export class User {
  constructor(
    public email: string,
    public position: string,
    public userName: string,
    public firstName: string,
    public lastName: string,
    public profilePhoto: string | null
  ) {}
}
