import { IPosition } from '../../entities/ITopic';

export interface PostTopicDTO {
  roadmap_id: number;
  label: string;
  type: string;
  skill_name: string;
  is_analysis_needed: boolean;
  prerequisites: string;
  position: IPosition;
}