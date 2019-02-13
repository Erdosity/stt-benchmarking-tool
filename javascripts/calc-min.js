function STTCalculatorCtrl(t){t.avgCallLength="5",t.totalCallVolume="1000000",t.callClarity="average",t.regionalDialects="minimal",t.audioChannel="dual",t.desiredAccuracy="70",t.callAuthentication="unimportant",t.humanLaborPrice="15",t.calculate=function(){console.log("inside calculate function"),t.awsTranscriptionCost=sttCalculator.awsTranscriptionCost(t),t.azureTranscriptionCost=sttCalculator.azureTranscriptionCost(t),t.googleTranscriptionCost=sttCalculator.googleTranscriptionCost(t),t.ibmTranscriptionCost=sttCalculator.ibmTranscriptionCost(t),t.manualTranscriptionCost=sttCalculator.manualTranscriptionCost(t)},t.init=function(){t.calculate()},t.init()}var sttCalculator=function(){function t(t){switch(t.callClarity){case"average":return 0;case"noisy":return 1}}function a(t){switch(t.regionalDialects){case"minimal":return 0;case"high":return 1}}function n(t){switch(t.audioChannel){case"mono":return 0;case"dual":return 1}}function r(t){switch(t.callAuthentication){case"unimportant":return 0;case"important":return 1}}function o(t){return parseInt(t.avgCallLength,10)}function i(t){return parseInt(t.totalCallVolume,10)}function c(t){return parseFloat(t.desiredAccuracy)/100}function l(t){return parseFloat(t.humanLaborPrice)}var e={awsTranscriptionCost:function(e){var u=(5.4139*Math.log(o(e))+2.935)*i(e)*(c(e)-(.5817-.007*t(e)+.075*n(e)-.173*a(e)+.21*r(e)))*.1/60*l(e);return u<=0&&(u=(5.4139*Math.log(o(e))+2.935)*i(e)*(c(e)-(.5817-.007*t(e)+.075*n(e)-.173*a(e)+.21*r(e)))*.1/60),u+o(e)*i(e)*.024},googleTranscriptionCost:function(r){var e=(5.4139*Math.log(o(r))+2.935)*i(r)*.01*(c(r)-(.765-.0256*t(r)+.17*n(r)-.203*a(r)))/60*l(r)+o(r)*i(r)*.024;return e<=0&&(e=(5.4139*Math.log(o(r))+2.935)*i(r)*.01*(c(r)-(.765-.0256*t(r)+.17*n(r)-.203*a(r)))/60+o(r)*i(r)*.024),e+o(r)*i(r)*.024},ibmTranscriptionCost:function(r){var e=(5.4139*Math.log(o(r))+2.935)*i(r)*(c(r)-(.835-.02*t(r)+.0478*n(r)-.234*a(r)))*.01/60*l(r);e<=0&&(e=(5.4139*Math.log(o(r))+2.935)*i(r)*(c(r)-(.835-.02*t(r)+.0478*n(r)-.234*a(r)))*.01/60);var u=0;return o(r)*i(r)<250001?u=o(r)*i(r)*.02:o(r)*i(r)>25e4&&o(r)*i(r)<500001?u=5e3+.015*(o(r)*i(r)-25e4):o(r)*i(r)>5e5&&(u=8750+.0125*(o(r)*i(r)-500001)),e+u},azureTranscriptionCost:function(r){var e=(5.4139*Math.log(o(r))+2.935)*i(r)*(c(r)-(.703-.05*t(r)+.098*n(r)-.189*a(r)))*.1/60*l(r);return e<=0&&(e=(5.4139*Math.log(o(r))+2.935)*i(r)*(c(r)-(.703-.05*t(r)+.098*n(r)-.189*a(r)))*.1/60),e+o(r)*i(r)/60},manualTranscriptionCost:function(t){return(5.4139*Math.log(o(t))+2.935)*i(t)/60*l(t)}};return e}();