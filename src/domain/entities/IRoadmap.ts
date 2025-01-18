export interface IResource {
  title: string;
  icon: string;
  link: string;
}

export interface IRoadmap {
  id: number;
  title: string;
  description: string;
  slug: string;
  creator: number;
  is_official: boolean;
  icon: string;
  visibility: string;
}