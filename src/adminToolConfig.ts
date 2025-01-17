export enum MatchingStrategy {
  EXACT = 1,
  DOMAIN = 2,
  SUB_DOMAIN = 3,
  DOMAIN_INCLUDE = 4,
  REGEX = 5,
}

export interface ToolConfig {
  match: MatchingStrategy;
  key?: string[];
  regex?: string;
}

export const toolConfig: ToolConfig = {
  key: ['ahu'],
  match: MatchingStrategy.SUB_DOMAIN,
  regex: undefined,
};
