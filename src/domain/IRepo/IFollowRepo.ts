import { GetRoadmapDTO } from '../DTOs/roadmap/GetRoadmapDTO';

export interface IFollowRepo {
  followToggle(roadmap: number, user: number): Promise<void>;
  following(user: number): Promise<GetRoadmapDTO[]>;
  followers(roadmap: number): Promise<number[]>;
  isFollowing(roadmap: number, user: number): Promise<boolean>;
}
