const modules = import.meta.glob('../commands/*.ts');

export const getAllProgram = () => {
  return Promise.all(
    Object.entries(modules)
      .map(([key]) => {
        return key.split('/').pop()?.split('.').slice(0, -1).join('.');
      })
      .map(async key => {
        const module = await import(`../commands/${key}.ts`);

        return { name: key, description: module['_description_'] };
      })
  );
};