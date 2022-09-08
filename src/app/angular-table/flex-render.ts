export function flexRender<TProps extends {}>(Comp: any, props: TProps) {
  if (!Comp) return null;
  // console.log('typeof Comp ', typeof Comp);
  // console.log(Comp, props);
  if (typeof Comp === 'function') {
    return Comp(props);
  }

  return Comp;
}
