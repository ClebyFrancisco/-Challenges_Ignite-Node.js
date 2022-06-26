import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository
    .createQueryBuilder()
    .select("games")
    .from(Game,"games")
    .where("games.title ILIKE :title",{title: `%${param}%`})
    .getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("SELECT COUNT(*) FROM games"); 
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return await this.repository
    .createQueryBuilder()
    .select("users")
    .from(User,"users")
    .innerJoin("users.games","games")
    .where("games.id = :id",{id:id})
    .getMany();

  }
}
