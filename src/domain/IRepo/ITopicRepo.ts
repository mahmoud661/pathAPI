import { ITopic } from '../entities/ITopic';
import { PostTopicDTO } from '../DTOs/topic/PostTopicDTO';
import { PutTopicDTO } from '../DTOs/topic/PutTopicDTO';

export interface ITopicRepo {
  create(topic: PostTopicDTO): Promise<ITopic>;
  update(id: number, topic: PutTopicDTO): Promise<ITopic>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<ITopic>;
  getByRoadmapId(roadmapId: number): Promise<ITopic[]>;
}