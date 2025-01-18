import { IResource } from '../../entities/IRoadmap';

export interface PutRoadmapDTO {
  title?: string;
  description?: string;
  icon?: string;
  resources?: IResource[];
}