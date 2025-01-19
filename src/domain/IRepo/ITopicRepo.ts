import { ITopic } from '../entities/ITopic';

export interface ITopicRepo {
  create(topic: ITopic[], roadmapId: number): Promise<ITopic[]>;
  delete(roadmapId: number): Promise<void>;
  getByRoadmap(roadmapId: number): Promise<ITopic[]>;
}