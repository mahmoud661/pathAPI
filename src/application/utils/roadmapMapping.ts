import { GetRoadmapDTO } from "../../domain/DTOs/roadmap/GetRoadmapDTO";
import { IRoadmap } from "../../domain/entities/IRoadmap";

export function toGet(roadmap: IRoadmap): GetRoadmapDTO {
  return {
    id: roadmap.id,
    title: roadmap.title,
    slug: roadmap.slug,
    description: roadmap.description,
    is_official: roadmap.is_official,
    icon: roadmap.icon,
  };
}