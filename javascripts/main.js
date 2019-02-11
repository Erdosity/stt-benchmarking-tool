/**
 * Angular Controller for the calculator
 */
function STTCalculatorCtrl($scope) {
      // set default values when the page first loads
      $scope.avgCallLength = "5";
      $scope.totalCallVolume = "1000000";
      $scope.callClarity = "average";
      $scope.regionalDialects = "minimal";
      $scope.audioChannel = "dual";
      $scope.desiredAccuracy = "70";
      $scope.callAuthentication = "unimportant";
      $scope.humanLaborPrice = "15";

      $scope.calculate = function() {
        console.log("inside calculate function");
        $scope.awsTranscriptionCost = sttCalculator.awsTranscriptionCost($scope);
        $scope.azureTranscriptionCost = sttCalculator.azureTranscriptionCost($scope);
        $scope.googleTranscriptionCost = sttCalculator.googleTranscriptionCost($scope);
        $scope.ibmTranscriptionCost = sttCalculator.ibmTranscriptionCost($scope);
        $scope.manualTranscriptionCost = sttCalculator.manualTranscriptionCost($scope);
    };
}

// l - avgCallLength
// v - totalCallVolume
// n - callClarity
// d - regionalDialects
// c - audioChannel
// e - desiredAccuracy
// p - callAuthentication
// h - humanLaborPrice


/**
 * STT calculator
 */
var sttCalculator = (function() {
    /**
        * Returns call clarity as a binary 0 or 1
        *
        * @private
        * @param {Object} scope - The Angular scope object
        * @return {binary Integer}
    */
    function decodeCallClarity(scope) {
        switch (scope.callClarity) {
            case 'average': return 0;
            case 'noisy': return 1;
        }
    }

    /**
        * Returns regional dialect as a binary 0 or 1
        *
        * @private
        * @param {Object} scope - The Angular scope object
        * @return {binary Integer}
    */
    function decodeRegionalDialects(scope) {
        switch (scope.regionalDialects) {
            case 'minimal': return 0;
            case 'high': return 1;
        }
    }

    /**
        * Returns audio channel as a binary 0 or 1
        *
        * @private
        * @param {Object} scope - The Angular scope object
        * @return {binary Integer}
    */
    function decodeAudioChannel(scope) {
        switch (scope.audioChannel) {
            case 'mono': return 0;
            case 'dual': return 1;
        }
    }

    /**
        * Returns call authentication as a binary 0 or 1
        *
        * @private
        * @param {Object} scope - The Angular scope object
        * @return {Integer}
    */
    function decodeCallAuthentication(scope) {
        switch (scope.callAuthentication) {
            case 'unimportant': return 0;
            case 'important': return 1;
        }
    }

    /**
        * Returns average call length as number
        *
        * @private
        * @param {Object} scope - The Angular scope object
        * @return {Integer}
    */
    function convertAvgCallLength(scope) {
        return parseInt(scope.avgCallLength, 10);
    }

    /**
        * Returns total call volume as number
        *
        * @private
        * @param {Object} scope - The Angular scope object
        * @return {Integer}
    */
    function convertTotalCallVolume(scope) {
        return parseInt(scope.totalCallVolume, 10);
    }

    /**
        * Returns total call volume as float (decimal in between 0 to 1)
        *
        * @private
        * @param {Object} scope - The Angular scope object
        * @return {Float}
    */
    function convertDesiredAccuracy(scope) {
        return parseFloat(scope.desiredAccuracy) / 100;
    }

    /**
        * Returns total call volume as float
        *
        * @private
        * @param {Object} scope - The Angular scope object
        * @return {Float}
    */
    function convertHumanLaborPrice(scope) {
        return parseFloat(scope.humanLaborPrice);
    }

    var cost = {};

    /**
        * Returns AWS Transcription Cost (labor + machine) as float
        *
        * @private
        * @param {Object} scope - The Angular scope object
        * @return {Float}
    */
    cost.awsTranscriptionCost = function(scope) {
        // LABOR COST: ((5.4139 * Math.log(avgCallLength) + 2.935) * totalCallVolume * (desiredAccuracy - ((.5817 - (callClarity * .007) + (audioChannel * .075) - (regionalDialects * .173) + .21 * callAuthentication))) * .1) / 60 * humanLaborPrice
        // API COST: avgCallLength * totalCallVolume * .024
        var laborCost = ((5.4139 * Math.log(convertAvgCallLength(scope)) + 2.935) * convertTotalCallVolume(scope) * (convertDesiredAccuracy(scope) - ((.5817 - (decodeCallClarity(scope) * .007) + (decodeAudioChannel(scope) * .075) - (decodeRegionalDialects(scope) * .173) + .21 * decodeCallAuthentication(scope)))) * .1) / 60 * convertHumanLaborPrice(scope);
        if (laborCost <= 0) {
              // then ignore human cost
              laborCost = ((5.4139 * Math.log(convertAvgCallLength(scope)) + 2.935) * convertTotalCallVolume(scope) * (convertDesiredAccuracy(scope) - ((.5817 - (decodeCallClarity(scope) * .007) + (decodeAudioChannel(scope) * .075) - (decodeRegionalDialects(scope) * .173) + .21 * decodeCallAuthentication(scope)))) * .1) / 60;
        }
        var apiCost = convertAvgCallLength(scope) * convertTotalCallVolume(scope) * .024;
        
        return laborCost + apiCost;
    };

    /**
        * Returns Google Transcription Cost (labor + machine) as float
        *
        * @private
        * @param {Object} scope - The Angular scope object
        * @return {Float}
    */
    cost.googleTranscriptionCost = function(scope) {
        // LABOR COST: ((5.4139 * Math.log(avgCallLength) + 2.935) * totalCallVolume *.01 * (desiredAccuracy - (0.765 - (callClarity * .0256) + (audioChannel * .170) - (regionalDialects * .203)))) / 60 * humanLaborPrice + avgCallLength * totalCallVolume *.024
        // API COST: avgCallLength * totalCallVolume * .024
        var laborCost = ((5.4139 * Math.log(convertAvgCallLength(scope)) + 2.935) * convertTotalCallVolume(scope) *.01 * (convertDesiredAccuracy(scope) - (0.765 - (decodeCallClarity(scope) * .0256) + (decodeAudioChannel(scope) * .170) - (decodeRegionalDialects(scope) * .203)))) / 60 * convertHumanLaborPrice(scope) + convertAvgCallLength(scope) * convertTotalCallVolume(scope) * .024;
        if (laborCost <= 0) {
              // then ignore human cost
              laborCost = ((5.4139 * Math.log(convertAvgCallLength(scope)) + 2.935) * convertTotalCallVolume(scope) *.01 * (convertDesiredAccuracy(scope) - (0.765 - (decodeCallClarity(scope) * .0256) + (decodeAudioChannel(scope) * .170) - (decodeRegionalDialects(scope) * .203)))) / 60 + convertAvgCallLength(scope) * convertTotalCallVolume(scope) * .024;
        }
        var apiCost = convertAvgCallLength(scope) * convertTotalCallVolume(scope) * .024;
        
        return laborCost + apiCost;
    };

    /**
        * Returns IBM Transcription Cost (labor + machine) as float
        *
        * @private
        * @param {Object} scope - The Angular scope object
        * @return {Float}
    */
    cost.ibmTranscriptionCost = function(scope) {
        // LABOR COST: ((5.4139 * Math.log(avgCallLength) + 2.935) * totalCallVolume *(desiredAccuracy - (.835 - (callClarity * .02) + (audioChannel * .0478) - (regionalDialects * .234))) * .01) / 60 * humanLaborPrice
        // API COST: (IF avgCallLength * totalCallVolume < 250001) THEN (avgCallLength * totalCallVolume * .02)
        // API COST: (IF 250000 < avgCallLength * totalCallVolume < 500001) THEN (250000 * .02 + (avgCallLength * totalCallVolume - 250000) * .015)
        // API COST: (IF 500000 < avgCallLength * totalCallVolume < 1000001) THEN (250000 * .02 + 250000 * .015 + (avgCallLength * totalCallVolume - 500001)*.0125)
        
        var laborCost = ((5.4139 * Math.log(convertAvgCallLength(scope)) + 2.935) * convertTotalCallVolume(scope) *(convertDesiredAccuracy(scope) - (.835 - (decodeCallClarity(scope) * .02) + (decodeAudioChannel(scope) * .0478) - (decodeRegionalDialects(scope) * .234))) * .01) / 60 * convertHumanLaborPrice(scope);
        if (laborCost <= 0) {
              // then ignore human cost
              laborCost = ((5.4139 * Math.log(convertAvgCallLength(scope)) + 2.935) * convertTotalCallVolume(scope) *(convertDesiredAccuracy(scope) - (.835 - (decodeCallClarity(scope) * .02) + (decodeAudioChannel(scope) * .0478) - (decodeRegionalDialects(scope) * .234))) * .01) / 60;
        }

        var apiCost = 0;
        if (convertAvgCallLength(scope) * convertTotalCallVolume(scope) < 250001)
            apiCost = convertAvgCallLength(scope) * convertTotalCallVolume(scope) * .02;
        else if ( ((convertAvgCallLength(scope) * convertTotalCallVolume(scope)) > 250000) && ((convertAvgCallLength(scope) * convertTotalCallVolume(scope)) < 500001) )
            apiCost = 250000 * .02 + (convertAvgCallLength(scope) * convertTotalCallVolume(scope) - 250000) * .015;
        else if ((convertAvgCallLength(scope) * convertTotalCallVolume(scope)) > 500000)
            apiCost = 250000 * .02 + 250000 * .015 + (convertAvgCallLength(scope) * convertTotalCallVolume(scope) - 500001)*.0125;
        
        return laborCost + apiCost;
    };

    /**
        * Returns Microsoft Transcription Cost (labor + machine) as float
        *
        * @private
        * @param {Object} scope - The Angular scope object
        * @return {Float}
    */
    cost.azureTranscriptionCost = function(scope) {
        // LABOR COST: ((5.4139 * Math.log(avgCallLength) + 2.935) * totalCallVolume *(desiredAccuracy - (.7030 - callClarity * .05 + audioChannel * .098 - regionalDialects * .189)) * .1) / 60 * humanLaborPrice
        // API COST: avgCallLength * totalCallVolume / 60
        var laborCost = ((5.4139 * Math.log(convertAvgCallLength(scope)) + 2.935) * convertTotalCallVolume(scope) *(convertDesiredAccuracy(scope) - (.7030 - decodeCallClarity(scope) * .05 + decodeAudioChannel(scope) * .098 - decodeRegionalDialects(scope) * .189)) * .1) / 60 * convertHumanLaborPrice(scope);
        if (laborCost <= 0) {
              // then ignore human cost
              laborCost = ((5.4139 * Math.log(convertAvgCallLength(scope)) + 2.935) * convertTotalCallVolume(scope) *(convertDesiredAccuracy(scope) - (.7030 - decodeCallClarity(scope) * .05 + decodeAudioChannel(scope) * .098 - decodeRegionalDialects(scope) * .189)) * .1) / 60;
        }
        var apiCost = convertAvgCallLength(scope) * convertTotalCallVolume(scope) / 60;
        
        return laborCost + apiCost;
    };

    /**
        * Returns Manual Transcription Cost (labor only manually) as float
        *
        * @private
        * @param {Object} scope - The Angular scope object
        * @return {Float}
    */
    cost.manualTranscriptionCost = function(scope) {
        // LABOR COST: ((5.4139 * Math.log(avgCallLength) + 2.935) * totalCallVolume) / 60 * humanLaborPrice
        var laborCost = ((5.4139 * Math.log(convertAvgCallLength(scope)) + 2.935) * convertTotalCallVolume(scope)) / 60 * convertHumanLaborPrice(scope);
        
        return laborCost;
    };
    

    return cost;
}());
