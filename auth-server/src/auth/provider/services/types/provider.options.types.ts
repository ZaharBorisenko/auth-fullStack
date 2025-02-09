export type ProviderOptionsTypes = {
  name: string;
  authorize_url: string;
  access_url: string;
  profile_url: string;
  scopes: string[];
  client_id: string;
  client_secret: string;
};

export type SpecialProviderOptionsTypes = {
  scopes: string[];
  client_id: string;
  client_secret: string;
};

export type UserInfoTypes = {
  id: string;
  userAvatar: string;
  userName: string;
  email: string;
  access_token?: string | null;
  refresh_token?: string;
  expires_at?: number;
  provider: string;
};
