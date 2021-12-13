export const _description_ = 'Clear console output';

export default function (
  this: IContext
) {
  this.clear();
  this.log('[Console cleared]');
}