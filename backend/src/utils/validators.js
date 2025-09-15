export const validateUser = ({ name, email, address, password }) => {
  if (name.length < 20 || name.length > 60) return "Name must be 20–60 chars";
  if (address.length > 400) return "Address too long";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email";
  if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/.test(password))
    return "Password must be 8–16 chars, include uppercase & special char";
  return null;
};
