export function getToken(header: string | undefined) {
  let token: string | undefined;

  if (header && header.startsWith("Bearer")) {
    token = header.split(" ")[1];
  } else {
    token = undefined;
  }

  return token;
}
