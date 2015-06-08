
import { join } from 'path';

import { assert, expect } from 'chai';
import { List, Map, fromJS } from 'immutable';

import { atom, add_watch, remove_watch } from '../lib/module';

describe('#Glue.module', function () {
  it('should return atom', function () {
    let moduleAtom = atom({});

    expect(moduleAtom).be.instanceof(Map);
    expect(moduleAtom.get('value')).be.eql({});
    expect(moduleAtom.get('listeners')).be.eql(List());
  });

  it('should add listener atom', function () {
    let moduleAtom = atom({}),
        listener = function () {};

    moduleAtom = add_watch(moduleAtom, listener);

    let listeners = moduleAtom.get('listeners');

    expect(listeners.count()).to.eql(1);
    expect(listeners.get(0)).to.equal(listener);
  });

  it('should remove listener by index', function () {
    let moduleAtom = atom({}),
        listener = function () {};

    moduleAtom = remove_watch(add_watch(moduleAtom, listener), 0);

    let listeners = moduleAtom.get('listeners');

    expect(listeners.count()).to.eql(0);
    expect(listeners.get(0)).to.equal(undefined);
  });

  it('should remove listener by function reference', function () {
    let moduleAtom = atom({}),
        listener = function () {};

    moduleAtom = remove_watch(add_watch(moduleAtom, listener), listener);

    let listeners = moduleAtom.get('listeners');

    expect(listeners.count()).to.eql(0);
    expect(listeners.get(0)).to.equal(undefined);
  });

});
