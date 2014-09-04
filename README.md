Degordian animations helper
=======
DAnimation object is used to animate ease with bezier functions

    TweenMax.to($('selector'), 1.5, {left:"80%", ease: DAnimation.bezier(0.04,0.86,0.8,1)});


DomTransitions object is used to simplyfy writing animations it enables to write animations rules from html

No need to position element on the start with css, we use data-from attribute to set the dom to proper position we use data-to to define target position and css attributes, we can use delay, duration and animation to define ease function

    <h1 data-transform
          data-from="transform:translate(0px,-100px), opacity: 0"
          data-to="transform:translate(0px,0px), opacity:1, duration:0.6, delay:0.3, animation:Power2.easeOut"
      >


with DomTransition.start() we position the elements on it's starting position

    DomTransition.start()

with DomTransition.animate() we begin the animation and animate attributes defined in data-to

    DomTransition.animate()
