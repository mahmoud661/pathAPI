export interface ITopic {
  roadmap: number;
  prerequisites: string;
  label: string;
  type: string;
  description: string;
  position_x: number;
  position_y: number;
  skill_name: string;
  is_analysis_needed: boolean;
  created_at: Date;
  updated_at: Date;
}

// TODO: remove z_index form DB
