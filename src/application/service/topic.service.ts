import Logger from '../../infrastructure/logger/consoleLogger';

export class TopicService {
  constructor(private _repo: any) {}

  async get() {
    return (await this._repo.get()).map((t: any) => t.label) ?? [];
  }

  async getAchieved(user: number) {
    Logger.Debug(user);
    return (await this._repo.getAchieved(user)) ?? [];
  }

  async achieve(topic: number, user: number) {
    await this._repo.achieve(topic, user);
  }

  async getSkills(user: number) {
    return (await this._repo.getSkills(user)) ?? [];
  }
}
