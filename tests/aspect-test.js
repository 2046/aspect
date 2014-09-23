define(function(require, exports, module){
    var expect, aspect, sinon;

    expect = require('expect');
    aspect = require('aspect');
    sinon = require('sinon');

    function equals(){
        var args = arguments;
        expect(args[0]).to.equal(args[1]);
    };

    describe('Aspect', function(){
        it('normal', function(){
            var counter = 1;

            function A(){};
            A.prototype.xxx = function(n, m){
                return counter += n + m;
            }

            var a = new A();

            aspect.before(a, 'xxx', function(n, m){
                equals(n, 1);
                equals(m, 2);
                equals(this, a);
            });

            aspect.after(a, 'xxx', function(ret){
                equals(ret, 4);
                equals(this, a);
                counter++;
            });

            a.xxx(1, 2);
            equals(counter, 5);

            counter = 1;

            try{
                aspect.before('zzz', function(){
                });
            }catch(e){
                counter++;
            }

            equals(counter, 2);
        });

        it('before return', function(){
            var spy = sinon.spy();
            var afterSpy = sinon.spy();
            var stub = sinon.stub();

            function A(){};
            A.prototype.fn = spy;
            var a = new A();

            aspect.before(a, 'fn', stub);
            aspect.after(a, 'fn', afterSpy);

            stub.returns(false);
            a.fn();
            expect(spy.called).not.to.be.ok();
            expect(afterSpy.called).not.to.be.ok();
            spy.reset();
            stub.reset();

            stub.returns(true);
            a.fn();
            expect(spy.called).to.be.ok();
            spy.reset();
            stub.reset();

            stub.returns(undefined);
            a.fn();
            expect(spy.called).to.be.ok();
            spy.reset();
            stub.reset();

            stub.returns('');
            a.fn();
            expect(spy.called).to.be.ok();
            spy.reset();
            stub.reset();
        });

        it('after/before support binding multiple methodNames at once', function(){
            var counter = 0;

            function incr(){
                counter++;
            }

            function A(){};
            A.prototype.show = function(){};
            A.prototype.hide = function(){};
            var a = new A();

            aspect.before(a, 'show hide', incr);
            aspect.after(a, 'show hide', incr);

            a.show();
            equals(counter, 2);
            a.hide();
            equals(counter, 4);
        });
    });
})