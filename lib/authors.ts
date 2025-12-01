export interface Author {
  name: string;
  position: string;
  avatar: string;
  url?: string;
}

export const authors: Record<string, Author> = {
  onnenai: {
    name: "Onnenai",
    position: "もふもふ大学生",
    avatar: "/authors/onnenai.png",
    url: "https://links.onnenai.cc/",
  },
} as const;

export type AuthorKey = keyof typeof authors;

export function getAuthor(key: AuthorKey): Author {
  return authors[key];
}

export function isValidAuthor(key: string): key is AuthorKey {
  return key in authors;
}
