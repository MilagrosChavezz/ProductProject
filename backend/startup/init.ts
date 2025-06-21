import userService from '../service/user.service';

export async function initializeDefaults() {
  await userService.createDefaultAdmin();
}
