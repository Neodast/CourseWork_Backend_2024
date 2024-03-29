import pgSectionRepository from '../../db/dbRepositories/postgreSQL/pgSectionRepository';
import SectionModel from '../models/sectionModel';
import ISectionRepository from '../repositories/ISectionRepository';

class SectionService {
  constructor(readonly sectionRepository: ISectionRepository) {}

  public async createSection(title: string): Promise<SectionModel> {
    return this.sectionRepository.createSection(title);
  }

  public async deleteSection(title: string): Promise<void> {
    const dbSection = await this.sectionRepository.getByTitle(title);
    return this.sectionRepository.deleteSection(dbSection);
  }

  public async getAllSections(): Promise<SectionModel[]> {
    return this.sectionRepository.getAll();
  }
}

export default new SectionService(pgSectionRepository);
