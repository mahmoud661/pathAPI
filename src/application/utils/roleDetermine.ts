import { toolConfig, MatchingStrategy } from '../../adminToolConfig';

export function isEditor(email: string): boolean {
  switch (toolConfig.match) {
    case MatchingStrategy.REGEX:
      const regex = new RegExp(toolConfig.regex!);
      return regex.test(email);
    case MatchingStrategy.EXACT:
      return toolConfig.key!.includes(email);
    case MatchingStrategy.DOMAIN:
      return toolConfig.key!.some((key) => email.endsWith(key));
    case MatchingStrategy.SUB_DOMAIN:
      const res = toolConfig.key!.some((key) =>
        email.split('@')[1].split('.').includes(key),
      );
      return res;
    case MatchingStrategy.DOMAIN_INCLUDE:
      return toolConfig.key!.some((key) => email.includes(key));
  }
}
