Function.prototype.optionize = function(){
  var self = this, argumentNames = self.argumentNames(), optionIndex = argumentNames.length - 1, 
    method = function(){
    var args = $A(arguments), options = typeof args.last() == 'object' ? args.pop() : {},
      prefilledArgs = (optionIndex == 0 ? [] : 
        ((args.length > 0 ? args : [null]).inGroupsOf(optionIndex).flatten())).concat(options);
    return self.apply(this, prefilledArgs);
  };
  method.argumentNames = function(){ return argumentNames };
  return method;
};

/** section: scripty2 core
 * class Number
 *  
 *  Extensions to the built-in `Number` object.
**/
Object.extend(Number.prototype, {
  /**
   *  Number#constrain(min, max) -> Number
   *  
   *  Returns `min` if number is less than `min`, `max` if number is greater
   *  than `max`. Returns itself otherwise.
  **/
  constrain: function(n1, n2) {
    var min = (n1 < n2) ? n1 : n2;
    var max = (n1 < n2) ? n2 : n1;
    
    var num = Number(this);
    
    if (num < min) num = min;
    if (num > max) num = max;
    
    return num;
  },
  
  /**
   *  Number#nearer(n1, n2) -> Number
   *  
   *  Returns either `n1` or `n2` — whichever is closer to the number, in
   *  absolute terms.
  **/
  nearer: function(n1, n2) {
    var num = Number(this);
    
    var diff1 = Math.abs(num - n1);
    var diff2 = Math.abs(num - n2);
    
    return (diff1 < diff2) ? n1 : n2;
  },
  
  /**
   *  Number#tween(target, position) -> Number
   *  - target (Number): tween target
   *  - position (Number): position between 0 (start of tween) and (end of
   *    tween); can also be < 0 and > 1.
   *
   *  Returns the number that is a given percentage between this number and
   *  a target number.
   *
   *      (1).tween(2, 0.5) -> 1.5
   *      (1).tween(2, 0) -> 1
   *      (1).tween(2, 1) -> 2
  **/
  tween: function(target, position) {
    return this + (target-this) * position;
  }
});

Object.propertize = function(property, object){
  return Object.isString(property) ? object[property] : property;
};