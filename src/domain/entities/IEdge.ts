export interface IEdge {
  id: string;
  roadmap_id: number;
  source: string;
  target: string;
  source_handle: string;
  target_handle: string;
  type: string;
  style: Record<string, any>;
  updated_at: Date;
}