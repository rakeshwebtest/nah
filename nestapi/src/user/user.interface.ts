export interface UserData {
  displayName: string;
  email: string;
  token: string;
  imageUrl?: string;
}

export interface UserRO {
  user: UserData;
}