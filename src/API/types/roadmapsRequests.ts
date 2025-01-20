import { IEdge } from '../../domain/entities/IEdge';
import { ITopic } from '../../domain/entities/ITopic';

export interface IPatchBody {
  topics: ITopic[],
  edges: IEdge[],
}
