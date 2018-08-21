import data from './data';
import mocha from 'mocha';
import Library from './interface/library';
import { expect, assert } from 'chai';
import { getManager } from './../src/index';

const test = (liba : Library) => {
    describe(liba.manager, () => {
        const manager = getManager(liba.manager);
        it(`should return deps of ${liba.name} v${liba.version}`, (done) => {
            manager.getDeps(liba.name, liba.version)
                .then((result) => {
                    assert.deepInclude(result, liba.dependency);
                    done();
                })
                .catch(done);
        });

        it(`should return deps with last of version for ${liba.name}`, (done) =>{
            manager.getDeps(liba.name)
            .then((result) => {
                assert.isNotEmpty(result);
                done();
            }).catch(done);
        });

        it(`should test rejections for inccorect name: ${liba.name}_test`, (done) => {
            manager.getMeta(`${liba.name}_test`)
                .then(() => {
                    done(new Error('Expected method to reject.'));
                })
                .catch((error) => {
                    assert.isDefined(error);
                    done();
                });
        });
    });
};

describe('getDeps()', () => {
    data.map((liba) => {
        test(liba);
    });
});
