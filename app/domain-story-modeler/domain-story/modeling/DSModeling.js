'use strict';

import Modeling from 'bpmn-js/lib/features/modeling/Modeling';

import { inherits } from 'util';

export default function DSModeling(eventBus, elementFactory, commandStack,
    domainStoryRules) {
  Modeling.call(this, eventBus, elementFactory, commandStack, domainStoryRules);
}

Modeling.prototype.updateLabel = function(element, newLabel, newBounds) {
  if (/^domainStory:/.test(element.type)) {
    this._commandStack.execute('element.updateCustomLabel', {
      element: element,
      newLabel: newLabel,
      newBounds: newBounds
    });
  } else {
    this._commandStack.execute('element.updateLabel', {
      element: element,
      newLabel: newLabel,
      newBounds: newBounds
    });
  }
};

Modeling.prototype.updateNumber = function(element, newNumber, newBounds) {
  if (/^domainStory:/.test(element.type)) {
    this._commandStack.execute('element.updateCustomLabel', {
      element: element,
      newNumber: newNumber,
      newBounds: newBounds
    });
  } else {
    this._commandStack.execute('element.updateLabel', {
      element: element,
      newNumber: newNumber,
      newBounds: newBounds
    });
  }
};

Modeling.prototype.replaceShape = function(oldShape, newShape, hints) {
  var context = {
    oldShape: oldShape,
    newData: newShape,
    hints: hints || {}
  };

  this._commandStack.execute('shape.replace', context);
  return context.newShape;
};

inherits(DSModeling, Modeling);

DSModeling.$inject = [
  'eventBus',
  'elementFactory',
  'commandStack',
  'domainStoryRules'
];
