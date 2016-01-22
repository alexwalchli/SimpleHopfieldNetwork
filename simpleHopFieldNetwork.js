'use strict';

(function (window, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        window.simpleHopFieldNetwork = factory();
    }
}(window, function () {

  function simpleHopFieldNetwork(size){
    var self = this;
    self.size = size;
    self.weightMatrix  = math.zeros(size, size);

    self.train = function(pattern){
      // convert 0's and 1's to -1's and 1's for a larger signal
      var encodedPattern = convertToBiPolarArray(pattern);

      // create initial encoded row matrix for the pattern
      var newPatternRowMatrix = math.matrix([encodedPattern]);

      // create an identical but transposed matrix of the pattern
      var newPatternColumnMatrix = math.transpose(newPatternRowMatrix);

      // all neurons are outputs and inputs and are interconnected with all other neurons
      // get the weights by multiplying the 2 matrices
      var newPatternTrainedWeightMatrix = math.multiply(newPatternColumnMatrix, newPatternRowMatrix);

      // subtract out the weights along the identity since neurons do not self-reference
      var identity = math.eye(newPatternTrainedWeightMatrix.size());
      var newPatternTrainedWeightMatrix = math.subtract(newPatternTrainedWeightMatrix, identity);

      // update the weight matrix
      self.weightMatrix = math.add(self.weightMatrix, newPatternTrainedWeightMatrix);
    }

    self.detectPattern = function(pattern){
      var detectedPattern = [];
      // convert 0's and 1's to -1's and 1's for a larger signal
      var encodedPattern = convertToBiPolarArray(pattern);
      var encodedPatternRowMatrix = math.matrix([encodedPattern]);

      // loop each column in the matrix or rather each neuron's weights to all other neurons
      for(var col = 0; col < pattern.length; col++){
        var columnMatrix = self.weightMatrix._data[col];
        columnMatrix = math.matrix(columnMatrix);

        // get the output of this neuron by calculating the dot product of the pattern and all weights to
        // the other neurons. note that as we loop through the columns the current neuron will have the 0 weight since
        // they do not self-reference
        var dotProduct = math.multiply(encodedPatternRowMatrix, columnMatrix);
        detectedPattern[col] = convertToBinary(dotProduct);
      }

      return detectedPattern;
    }

    function convertToBiPolarArray(pattern){
      var biPolarArray = [];
      var splitPattern = pattern.split('');
      for(var i = 0; i < pattern.length; i++){
        biPolarArray.push(splitPattern[i] == 1 ? 1 : -1);
      }

      return biPolarArray;
    }

    function convertToBinary(number){
      return number > 0 ? 1 : 0;
    }
  }

    return simpleHopFieldNetwork;
}));
