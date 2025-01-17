export interface IPosition {
  x: number;
  y: number;
}

export interface ITopic {
  id: number;
  roadmap_id: number;
  label: string;
  type: string;
  is_achieved: boolean;
  skill_name: string;
  is_analysis_needed: boolean;
  prerequisites: string;
  position: IPosition;
  created_at: Date;
  updated_at: Date;
}