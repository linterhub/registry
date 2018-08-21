import data from './data';
import mocha from 'mocha';
import Library from './interface/library';
import { expect, assert } from 'chai';
import { getManager } from './../src/index';

const test = (liba : Library) => {
    describe(liba.manager, () => {
        const manager = getManager(liba.manager);
        it(`should return meta of ${liba.name} v${liba.version}`, (done) => {
            manager.getMeta(liba.name, liba.version)
                .then((result) => {
                    expect(result.version).to.equal(liba.version);
                    expect(result.name).to.equal(liba.name);
                    done();
                })
                .catch(done);
        });

        it(`should return meta with last of version for ${liba.name}`, (done) =>{
            manager.getMeta(liba.name)
            .then((result) => {
                expect(result.name).to.equal(liba.name);
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

describe('getMeta()', () => {
    data.map((liba) => {
        test(liba);
    });
});
