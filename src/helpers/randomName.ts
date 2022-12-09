export const getRandomName = () => {
  const randomName = Math.random().toString(36).substring(2);
  return randomName;
};
