import { Owner } from "../owner/owner.type";
import { SignInPayload } from "../signin/signin.type";
import { SignUpPayload } from "../signup/signup.type";

export type AuthContextType = {
  user: Owner | null;
  signin: (payload: SignInPayload) => Promise<{ id: Owner; token: string }>;
  register: (payload: SignUpPayload) => Promise<void>;
  signout: () => void;
};
