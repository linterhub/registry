import data from './data';
import { Linter } from './interface/library';
import mocha from 'mocha';
import { expect, assert } from 'chai';
import { Registry, Request, RegistryCollection } from './../src/index';

const test = (linter : Linter) => {
    describe(linter.registry, () => {
        const registry = new Registry(RegistryCollection[linter.registry]);
        it(`should return meta of ${linter.name} v${linter.version}`, (done) => {
            registry.get(Request.Meta, {
                name: linter.name,
                version: linter.version
            })
            .then((result) => {
                expect(result.data.version).to.equal(linter.version);
                expect(result.data.name).to.equal(linter.name);
                done();
            })
            .catch(done);
        });

        it(`should return meta with last of version for ${linter.name}`, (done) =>{
            registry.get(Request.Meta, {
                name: linter.name
            })
            .then((result) => {
                expect(result.data.name).to.equal(linter.name);
                done();
            }).catch(done);
        });

        it(`should test rejections for inccorect name: ${linter.name}_test`, (done) => {
            registry.get(Request.Meta, {
                name: `${linter.name}_test`
            })
            .then((result) => {
                assert.isDefined(result.error);
                done();
            });
        });
    });
};

describe('Meta request', () => {
    data.map((linter) => {
        test(linter);
    });
});
