export class TopicService {
  constructor(private _repo: any) {}
  
  async get() {
    return await this._repo.get() ?? [];
  }

  async getAchieved(user: number) {
    return await this._repo.getAchieved() ?? [];
  }

  async achieve(topic: number, user: number) {
    await this._repo.achieve(topic, user);
  }
}