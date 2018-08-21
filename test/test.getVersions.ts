import data from './data';
import mocha from 'mocha';
import Library from './interface/library';
import { expect, assert } from 'chai';
import { getManager } from './../src/index';

const test = (liba : Library) => {
    describe(liba.manager, () => {
        const manager = getManager(liba.manager);
        it(`should return versions array of ${liba.name}`, (done) => {
            manager.getVersions(liba.name)
                .then((result) => {
                    assert.include(result, liba.version);
                    done();
                })
                .catch(done);
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

describe('getVersion()', () => {
    data.map((liba) => {
        test(liba);
    });
});
