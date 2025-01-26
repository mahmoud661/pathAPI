import { ITopic } from '../entities/ITopic';

export interface ITopicRepo {
  create(topic: ITopic[], roadmapId: number): Promise<void>;
  delete(roadmapId: number): Promise<void>;
  getByRoadmap(roadmapId: number): Promise<ITopic[]>;
  achieve(topicI: number, user: number): Promise<void>;
  getByUser(user: number): Promise<ITopic[]>;
  get(): Promise<ITopic[]>;
  getAchieved(user: number): Promise<ITopic[]>;
  getAchievedInRoadmap(user: number, roadmapId: number): Promise<ITopic[]>;
  getSkills(user: number): Promise<ITopic[]>;
}
