import data from './data';
import { Linter } from './interface/library';
import { expect, assert } from 'chai';
import mocha from 'mocha';
import { Registry, Request, RegistryCollection } from './../src/index';

const test = (linter : Linter) => {
    describe(linter.registry, () => {
        const registry = new Registry(RegistryCollection[linter.registry]);
        it(`should return versions array of ${linter.name}`, (done) => {
            registry.get(Request.Versions, {
                name: linter.name
            })
            .then((result) => {
                assert.include(result.data, linter.version);
                done();
            })
            .catch(done);
        });

        it(`should test rejections for inccorect name: ${linter.name}_test`, (done) => {
            registry.get(Request.Versions, {
                name: `${linter.name}_test`
            })
            .then((result) => {
                assert.isDefined(result.error);
                done();
            });
        });
    });
};

describe('Versions request', () => {
    data.map((linter) => {
        test(linter);
    });
});
