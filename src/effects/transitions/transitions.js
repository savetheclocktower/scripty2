/**
 * s2.fx.Transitions
 *
 * Transitions can fine-tune how an effect evolves over time. All effects,
 * without the use of transitions, normally evolve linearily.
 *
 * All transitions take a `position` argument, which is between
 * 0 (start of effect) and 1 (end of effect). Transitions return a number,
 * which is a "translation" of `position` argument. The return value can,
 * depending on transition type, be above 1 or below 0.
 *
 * By using Transitions, it is easily possible to add movement easing,
 * pulsation, bouncing, reversal and other forms of special effects.
 *
 * <h4>Default transition</h4
 *
 * If no transition option is given to an effect, [[s2.fx.Transitions.sinusoidal]] is used.
 * This setting can be changed by redefining [[s2.fx.DefaultOptions.transition]].
 *
 * <h4>Implementing your own transitions</h4>
 *
 * Transitions can easily be added, by using this template:
 *
 *     Object.extend(s2.fx.Transitions, {
 *       myTransition: function(pos) {
 *         return pos; // do your calculations here!
 *       }
 *     });
 *
 * Transitions defined this way automatically become available to be used with
 * the shorthand syntax for the `options.transition` argument:
 *
 *     $('some_element').morph('left:300px', { transition: 'myTransition' });
 *
 * <h4>Notice</h4>
 *
 * The equations defined in penner.js are open source under the BSD License.
 * Easing Equations
 * <a href="http://www.robertpenner.com/easing_terms_of_use.html">© 2003 Robert Penner</a>,
 * all rights reserved.
**/

s2.fx.Transitions = {

  /**
   *  s2.fx.Transitions.linear(pos) -> Number
   *  - pos (Number): position between 0 (start of effect) and 1 (end of effect)
   *
   *  Basic linear transition, no easing or other alteration of the effect.
   *  <div class="transition"></div>
  **/
  linear: Prototype.K,

  /**
   *  s2.fx.Transitions.sinusoidal(pos) -> Number
   *  - pos (Number): position between 0 (start of effect) and 1 (end of effect)
   *
   *  Alters the effect timing to be aligned to a sine wave.
   *  <div class="transition"></div>
  **/
  sinusoidal: function(pos) {
    return (-Math.cos(pos*Math.PI)/2) + 0.5;
  },

  /**
   *  s2.fx.Transitions.reverse(pos) -> Number
   *  - pos (Number): position between 0 (start of effect) and 1 (end of effect)
   *
   *  Effect is executed in a reverse linear fashion.
   *  <div class="transition"></div>
  **/
  reverse: function(pos) {
    return 1 - pos;
  },

  /**
   *  s2.fx.Transitions.mirror(pos[, transition]) -> Number
   *  - pos (Number): position between 0 (start of effect) and 1 (end of effect)
   *  - transition (Function): a s2.fx.Transitions transition function
   *
   *  The given transition is mirrored. Defaults to [[s2.fx.Transitions.sinusoidal]].
   *  <div class="transition"></div>
   *
   *  You can use other transitions as per the following code sample:
   *
   *      $('element_id').morph('font-size:200px', {
   *        transition: function(pos){
   *          return s2.fx.Transitions.mirror(pos, s2.fx.Transitions.bounce);
   *        }
   *      });
   *
   *  If you plan to reuse such a mirrored transition often, define your own transition
   *  function:
   *
   *      s2.fx.Transitions.mirroredBounce = function(pos){
   *        return s2.fx.Transitions.mirror(pos, s2.fx.Transitions.bounce);
   *      });
   *
   *      $('element_id').morph('font-size:200px', { transition: 'mirroredBounce' });
  **/
  mirror: function(pos, transition) {
    transition = transition || s2.fx.Transitions.sinusoidal;
    if(pos<0.5)
      return transition(pos*2);
    else
      return transition(1-(pos-0.5)*2);
  },

  /**
   *  s2.fx.Transitions.flicker(pos) -> Number
   *  - pos (Number): position between 0 (start of effect) and 1 (end of effect)
   *
   *  Effect flickers along a sine wave.
   *  <div class="transition"></div>
  **/
  flicker: function(pos) {
    var pos = pos + (Math.random()-0.5)/5;
    return s2.fx.Transitions.sinusoidal(pos < 0 ? 0 : pos > 1 ? 1 : pos);
  },

  /**
   *  s2.fx.Transitions.wobble(pos) -> Number
   *  - pos (Number): position between 0 (start of effect) and 1 (end of effect)
   *
   *  Effect wobbles increasingly fast between start and end positions.
   *  <div class="transition"></div>
  **/
  wobble: function(pos) {
    return (-Math.cos(pos*Math.PI*(9*pos))/2) + 0.5;
  },

  /**
   *  s2.fx.Transitions.pulse(pos[, pulses]) -> Number
   *  - pos (Number): position between 0 (start of effect) and 1 (end of effect)
   *  - pulses (Number): Number of pulses, defaults to 5
   *
   *  Effect pulses along a sinusoidal transition.
   *  <div class="transition"></div>
  **/
  pulse: function(pos, pulses) {
    return (-Math.cos((pos*((pulses||5)-.5)*2)*Math.PI)/2) + .5;
  },

  /**
   *  s2.fx.Transitions.blink(pos[, blinks]) -> Number
   *  - pos (Number): position between 0 (start of effect) and 1 (end of effect)
   *  - pulses (Number): Number of blinks, defaults to 5
   *
   *  Effect blinks on and off.
   *  <div class="transition"></div>
  **/
  blink: function(pos, blinks) {
    return Math.round(pos*(blinks||5)) % 2;
  },

  /**
   *  s2.fx.Transitions.spring(pos) -> Number
   *  - pos (Number): position between 0 (start of effect) and 1 (end of effect)
   *
   *  Alters the effect timing to a "spring".
   *  <div class="transition"></div>
  **/
  spring: function(pos) {
    return 1 - (Math.cos(pos * 4.5 * Math.PI) * Math.exp(-pos * 6));
  },

  /**
   *  s2.fx.Transitions.none() -> Number
   *
   *  No transition, the effect stays in intial state (returns 0 regardless of input values).
   *  <div class="transition"></div>
  **/
  none: Prototype.K.curry(0),

  /**
   *  s2.fx.Transitions.full() -> Number
   *
   *  No transition, the effect is always in final state (returns 1 regardless of input values).
   *  <div class="transition"></div>
  **/
  full: Prototype.K.curry(1)
};

//= require <effects/transitions/penner>