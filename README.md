# SimpleHopfieldNetwork
Stupid simple Hopfield Network implementation in JavaScript

##Dependencies
You'll just need http://mathjs.org/.

##How to use it
```
// initialize it by creating a new network and passing in the size
var simpleHopfieldNetwork = new simpleHopfieldNetwork(6);

// train it to detect a binary pattern, must be the same length as the size. 
// you can train it on multiple patterns
simpleHopfieldNetwork.train("100001");

// see if it'll detect the patterns you trained it on by using something similar
var detectedPattern = simpleHopfieldNetwork.detectPattern("100101"); // outputs 100001
```
