import { Arg, Mutation, Query, Resolver } from "type-graphql";
import dataSource from "../dataSource";
import Skill from "../entities/Skill";

@Resolver()
export class SkillResolver {
  @Query(() => [Skill])
  async getAllSkills(): Promise<Skill[]> {
    const skills = await dataSource.manager.find(Skill, {
      relations: { wilders: true },
    });
    return skills;
  }

  @Query(() => Skill)
  async getSkill(@Arg("name") name: string): Promise<Skill | null> {
    const skill = await dataSource.manager.findOne(Skill, {
      where: { name },
      relations: ["skills"],
    });
    return skill;
  }

  @Mutation(() => Skill)
  async addSkill(@Arg("name") name: string): Promise<Skill> {
    const skillToCreate = new Skill();
    skillToCreate.name = name;
    return await dataSource.manager.save(Skill, skillToCreate);
  }

  @Mutation(() => Skill)
  async deleteSkill(@Arg("name") name: string): Promise<Skill | null> {
    const skillToDelete = await dataSource.manager.findOne(Skill, {
      where: { name },
    });
    if (skillToDelete == null) {
      return null;
    }
    await dataSource.manager.delete(Skill, name);
    return skillToDelete;
  }
}
