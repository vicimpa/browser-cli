export default (...args: string[]) => {
  return eval(args.join(' '));
};

export const _description_ = 'Eval JavaScript';