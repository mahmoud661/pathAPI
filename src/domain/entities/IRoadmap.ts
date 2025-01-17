export interface IResource {
  title: string;
  icon: string;
  link: string;
}

export interface IRoadmap {
  id: number;
  title: string;
  description: string;
  icon: string;
  resources: IResource[];
  created_at: Date;
  updated_at: Date;
}