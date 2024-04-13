import { playersGetByGroup } from './playersGetByGroup';

export async function playersGetByGroupAndTeam(group: string, gang: string) {
  try {
    const storage = await playersGetByGroup(group);

    const players = storage.filter(player => player.gang === gang);

    return players;
  } catch (error) {
    throw error;
  }
}