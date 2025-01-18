import { IPosition } from '../../entities/ITopic';

export interface PutTopicDTO {
  label?: string;
  type?: string;
  is_achieved?: boolean;
  skill_name?: string;
  is_analysis_needed?: boolean;
  prerequisites?: string;
  position?: IPosition;
}