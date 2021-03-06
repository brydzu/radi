import customAttribute from '../../r/customAttribute';

const animate = (target, type, opts, done) => {
  const direct = opts[type];
  if (typeof direct !== 'function') {
    console.warn(`[Radi.js] Animation \`${type}\` for node \`${target.nodeName.toLowerCase}\` should be function`);
    return;
  }

  return direct(target, done);
};

customAttribute('animation', (el, props) => {
  animate(el, 'in', props, () => {});
  el.beforedestroy = done => animate(el, 'out', props, done);
});
