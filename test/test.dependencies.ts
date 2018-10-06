import data from './data';
import { Linter } from './interface/library';
import mocha from 'mocha';
import { expect, assert } from 'chai';
import { Registry, Request, RegistryCollection } from './../src/index';

const test = (linter : Linter) => {
    describe(linter.registry, () => {
        const registry = new Registry(RegistryCollection[linter.registry]);
        it(`should return deps of ${linter.name} v${linter.version}`, (done) => {
            registry.get(Request.Dependencies, {
                name: linter.name,
                version: linter.version
            })
            .then((result) => {
                assert.deepInclude(result.data, linter.dependency);
                done();
            })
            .catch(done);
        });

        it(`should return deps with last of version for ${linter.name}`, (done) =>{
            registry.get(Request.Dependencies, {
                name: linter.name
            })
            .then((result) => {
                assert.isNotEmpty(result.data);
                done();
            }).catch(done);
        });

        it(`should test rejections for inccorect name: ${linter.name}_test`, (done) => {
            registry.get(Request.Dependencies, {
                name: `${linter.name}_test`
            })
            .then((result) => {
                assert.isDefined(result.error);
                done();
            });
        });
    });
};

describe('Dependency request', () => {
    data.map((linter) => {
        test(linter);
    });
});
