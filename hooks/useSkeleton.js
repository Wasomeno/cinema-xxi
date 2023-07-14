export function useSkeleton(component, amount) {
  let skeletons = [];
  for (let i = 0; i < amount; ++i) {
    skeletons[i] = component;
  }
  return skeletons;
}
