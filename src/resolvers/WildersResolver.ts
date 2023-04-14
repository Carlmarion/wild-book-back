import { Arg, Mutation, Query, Resolver } from "type-graphql";
import dataSource from "../dataSource";
import Wilder from "../entities/Wilder";

@Resolver()
export class WildersResolver {
  @Query(() => [Wilder])
  async getAllWilders(): Promise<Wilder[]> {
    const wilders = await dataSource.manager.find(Wilder, {
      relations: { skills: true },
    });
    return wilders;
  }

  @Query(() => Wilder)
  async getWilder(@Arg("id") id: number): Promise<Wilder | null> {
    const wilder = await dataSource.manager.findOne(Wilder, {
      where: { id },
      relations: ["skills"],
    });
    return wilder;
  }

  @Mutation(() => Wilder)
  async addWilder(
    @Arg("name") name: string,
    @Arg("city") city: string
  ): Promise<Wilder> {
    const wilderToCreate = new Wilder();
    wilderToCreate.name = name;
    wilderToCreate.city = city;
    return await dataSource.manager.save(Wilder, wilderToCreate);
  }

  @Mutation(() => Wilder)
  async deleteWilder(@Arg("id") id: number): Promise<Wilder | null> {
    const wilderToDelete = await dataSource.manager.findOne(Wilder, {
      where: { id },
    });
    if (wilderToDelete == null) {
      return null;
    }
    await dataSource.manager.delete(Wilder, id);
    return wilderToDelete;
  }

  @Mutation(() => Wilder)
  async updateWilder(
    @Arg("id") id: number,
    @Arg("name") name: string,
    @Arg("city") city: string
  ): Promise<Wilder | null> {
    const wilderToUpdate = await dataSource.manager.findOne(Wilder, {
      where: { id },
    });

    if (wilderToUpdate == null) {
      return null;
    }
    wilderToUpdate.name = name;
    wilderToUpdate.city = city;

    const updatedWilder = await dataSource.manager.save(wilderToUpdate);

    return updatedWilder;
  }
}
