import { IResource } from '../../entities/IRoadmap';

export interface PostRoadmapDTO {
  title: string;
  description: string;
  icon: string;
  resources: IResource[];
}