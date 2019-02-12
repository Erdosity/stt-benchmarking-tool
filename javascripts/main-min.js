function STTCalculatorCtrl(t){t.avgCallLength="5",t.totalCallVolume="1000000",t.callClarity="average",t.regionalDialects="minimal",t.audioChannel="dual",t.desiredAccuracy="70",t.callAuthentication="unimportant",t.humanLaborPrice="15",t.calculate=function(){console.log("inside calculate function"),t.awsTranscriptionCost=sttCalculator.awsTranscriptionCost(t),t.azureTranscriptionCost=sttCalculator.azureTranscriptionCost(t),t.googleTranscriptionCost=sttCalculator.googleTranscriptionCost(t),t.ibmTranscriptionCost=sttCalculator.ibmTranscriptionCost(t),t.manualTranscriptionCost=sttCalculator.manualTranscriptionCost(t)},t.init=function(){t.calculate()},t.init()}var sttCalculator=function(){function r(t){switch(t.callClarity){case"average":return 0;case"noisy":return 1}}function o(t){switch(t.regionalDialects){case"minimal":return 0;case"high":return 1}}function i(t){switch(t.audioChannel){case"mono":return 0;case"dual":return 1}}function n(t){switch(t.callAuthentication){case"unimportant":return 0;case"important":return 1}}function c(t){return parseInt(t.avgCallLength,10)}function l(t){return parseInt(t.totalCallVolume,10)}function e(t){return parseFloat(t.desiredAccuracy)/100}function u(t){return parseFloat(t.humanLaborPrice)}var t={awsTranscriptionCost:function(t){var a=(5.4139*Math.log(c(t))+2.935)*l(t)*(e(t)-(.5817-.007*r(t)+.075*i(t)-.173*o(t)+.21*n(t)))*.1/60*u(t);return a<=0&&(a=(5.4139*Math.log(c(t))+2.935)*l(t)*(e(t)-(.5817-.007*r(t)+.075*i(t)-.173*o(t)+.21*n(t)))*.1/60),a+c(t)*l(t)*.024},googleTranscriptionCost:function(t){var a=(5.4139*Math.log(c(t))+2.935)*l(t)*.01*(e(t)-(.765-.0256*r(t)+.17*i(t)-.203*o(t)))/60*u(t)+c(t)*l(t)*.024;return a<=0&&(a=(5.4139*Math.log(c(t))+2.935)*l(t)*.01*(e(t)-(.765-.0256*r(t)+.17*i(t)-.203*o(t)))/60+c(t)*l(t)*.024),a+c(t)*l(t)*.024},ibmTranscriptionCost:function(t){var a=(5.4139*Math.log(c(t))+2.935)*l(t)*(e(t)-(.835-.02*r(t)+.0478*i(t)-.234*o(t)))*.01/60*u(t);a<=0&&(a=(5.4139*Math.log(c(t))+2.935)*l(t)*(e(t)-(.835-.02*r(t)+.0478*i(t)-.234*o(t)))*.01/60);var n=0;return c(t)*l(t)<250001?n=c(t)*l(t)*.02:25e4<c(t)*l(t)&&c(t)*l(t)<500001?n=5e3+.015*(c(t)*l(t)-25e4):5e5<c(t)*l(t)&&(n=8750+.0125*(c(t)*l(t)-500001)),a+n},azureTranscriptionCost:function(t){var a=(5.4139*Math.log(c(t))+2.935)*l(t)*(e(t)-(.703-.05*r(t)+.098*i(t)-.189*o(t)))*.1/60*u(t);return a<=0&&(a=(5.4139*Math.log(c(t))+2.935)*l(t)*(e(t)-(.703-.05*r(t)+.098*i(t)-.189*o(t)))*.1/60),a+c(t)*l(t)/60},manualTranscriptionCost:function(t){return(5.4139*Math.log(c(t))+2.935)*l(t)/60*u(t)}};return t}();
