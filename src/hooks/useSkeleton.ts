export function useSkeleton(component: React.JSX.Element, amount: number) {
  let skeletons = []
  for (let i = 0; i < amount; ++i) {
    skeletons[i] = component
  }
  return skeletons
}
