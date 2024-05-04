export type SignUpPayload = {
  name: string;
  birthday: string;
  gender: "Male" | "Female" | "Other";
  phone: string;
  cpf: string;
  email: string;
  password: string;
};
