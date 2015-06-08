
import I from 'immutable';
import R from 'ramda';

/**
 * New API. Result of thinking by this issue
 * https://github.com/fun-stack/glue/issues/7
 */
/**
 * Concept of immutability getted from
 * https://github.com/tonsky/vec/blob/gh-pages/vec.js
 */

let list = function () { return I.List.of.apply(I.List, arguments); },
    map  = function () { return I.Map.apply(I, arguments); },
    fjs  = function () { return I.fromJS.apply(I, arguments); };

/**
 * Create new atom
 * @param   {T}     value Atom value
 * @return  {I.Map}       New Atom
 */
export function atom(value) {
  return map({
    value: value,
    listeners: list()
  });
}

/**
 * Add new listener for changes
 * @param   {Atom}      atom      Atom for add listeners
 * @param   {Function}  listener  Listener
 * @return  {Atom}
 */
export function add_watch(atom, listener) {
  return atom.set('listeners', atom.get('listeners').push(listener));
}

/**
 * Remove listener from atom
 * @param {Atom}              atom  Atom for remove listener
 * @param {Number | Function} index Index of listener of remove or that listener
 */
export function remove_watch(atom, listener) {
  let remove_listener = function (atom, index) {
    return atom.set('listeners', atom.get('listeners').delete(index));
  };

  return R.ifElse(
    R.compose(
      R.curry(R.eq('Number')),
      R.curry(R.type)
    ),
    R.curry(remove_listener)(atom),
    R.compose(
      R.curry(remove_listener)(atom),
      atom.get('listeners').indexOf.bind(atom.get('listeners'))
    )
  )(listener);
}

/**
 * Create new Immutability module
 * @param {T} value Glued module
 */
export function Module(value) {

}
