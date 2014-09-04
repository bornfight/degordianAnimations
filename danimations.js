/**
 * Helpers for gsap animations
 *
 *
 */

/**
 * DAnimation object is used to animate ease with bezier functions
 * example: TweenMax.to($('selector'), 1.5, {left:"80%", ease: DAnimation.bezier(0.04,0.86,0.8,1)});
 */
var DAnimation = ({
    start: 0,
    bezier: function(p0, p1, p2, p3){
        return DAnimation.polyBez([p0, p1], [p2, p3]);

    },
    polyBez: function(p1, p2) {
        var A = [null, null], B = [null, null], C = [null, null],
            bezCoOrd = function(t, ax) {
                C[ax] = 3 * p1[ax], B[ax] = 3 * (p2[ax] - p1[ax]) - C[ax], A[ax] = 1 - C[ax] - B[ax];
                return t * (C[ax] + t * (B[ax] + t * A[ax]));
            },
            xDeriv = function(t) {
                return C[0] + t * (2 * B[0] + 3 * A[0] * t);
            },
            xForT = function(t) {
                var x = t, i = 0, z;
                while (++i < 14) {
                    z = bezCoOrd(x, 0) - t;
                    if (Math.abs(z) < 1e-3) break;
                    x -= z / xDeriv(x);
                }
                console.log(x);
                return x;
            };
        return function(t) {
            return bezCoOrd(xForT(t), 1);
        }
    },
    goldernRation: function(t){
        //still in progress
        var ratio = 1.61803398875;

        if(self.start = 0){
            start = t;
        }
        var output = (t * ratio + start)

        if(output > 1){
            return 1;
        }
        return output;
    }
});

/**
 * DomTransitions object is used to simplyfy writing animations
 * it enables to write animations rules from html
 *
 * No need to position element on the start with css, we use data-from attribute to set the dom to proper position
 * we use data-to to define target position and css attributes, we can use delay, duration and animation to define ease function
 *
 * example:
 *  <h1 data-transform
 *      data-from="transform:translate(0px,-100px), opacity: 0"
 *      data-to="transform:translate(0px,0px), opacity:1, duration:0.6, delay:0.3, animation:Power2.easeOut"
 *  >
 *
 *  with DomTransition.start() we position the elements on it's starting position
 *  with DomTransition.animate() we begin the animation and animate attributes defined in data-to
 *
 *
 */
//todo maybe remove jquery dependency, trim whitespaces
var DomTransitions = ({
    start: function (){
        $("[data-transform]").each(function(){

            //Set to starting point
            var string = $(this).data('from');
            var condition = "none";
            var setExpression = 'none';
            var noExpression = 'none';
            var properties = string.split(', ');
            var obj = {};
            properties.forEach(function(property) {
                var tup = property.split(':');

                if(tup[0] == 'condition'){
                    condition = tup[1];
                }else if(tup[0] == 'setExpression'){
                    setExpression = tup[1]
                }else if(tup[0] == 'noExpression'){
                    noExpression = tup[1]
                }else{
                    obj[tup[0]] = tup[1];
                }

            });

            if(noExpression != 'none' && $("[" + noExpression + "]").length > 0 ){
                return false;
            }
            if(setExpression != 'none' ){
                $('body').attr(setExpression, 'on')
            }

            var css = obj;
            if(condition != 'none' && $(this).hasClass(condition)){
                $(this).css(css);
            }else if(condition == 'none'){
                $(this).css(css);

            }
        });
    },
    animate: function (){

        $("[data-transform]").each(function(){

            var string = $(this).data('to');
            var properties = string.split(', ');
            var obj = {};

            var delay = 0;
            var duration = 1;
            var animation = "Power1.easeOut";
            var condition = "none";

            properties.forEach(function(property) {
                var tup = property.split(':');
                if(tup[0] == 'delay'){
                    delay = tup[1];
                }else if(tup[0] == 'animation'){
                    animation = tup[1];
                }else if(tup[0] == 'duration'){
                    duration = tup[1];
                }else if(tup[0] == 'condition'){
                    condition = tup[1];
                }else {
                    obj[tup[0]] = tup[1];
                }

            });

            if(condition != 'none' && $(this).hasClass(condition)){
                TweenLite.to($(this), duration, {css: obj, delay:delay, ease:animation, force3D:true});
            }else if(condition == 'none'){
                TweenLite.to($(this), duration, {css: obj, delay:delay, ease:animation, force3D:true});

            }
        });
    }
});