var assert = require("assert");
var justgallery = require("../justgallery");

describe('justgallery', function(){
  var input = undefined,
      expected = undefined;

  beforeEach(function() {
    input = [
      { width: 200, height: 120 },
      { width: 120, height: 120 },
      { width: 50, height: 120 },
      { width: 70, height: 120 },
      { width: 170, height: 120 },
      { width: 40, height: 120 }
    ];

    expected = [
      [
        { "jg-width": 184, "jg-height": 120, "jg-marginleft": -8 },
        { "jg-width": 111, "jg-height": 120, "jg-marginleft": -4 }
      ], [
        { "jg-width": 50, "jg-height": 120, "jg-marginleft": 0 },
        { "jg-width": 70, "jg-height": 120, "jg-marginleft": 0 },
        { "jg-width": 170, "jg-height": 120, "jg-marginleft": 0 }
      ], [
        { "jg-width": 40, "jg-height": 120, "jg-marginleft": 0 }
      ]
    ];
  });


  describe('justgallery', function(){

    it('should calc dimensions and margin', function(){
      var result = justgallery.justgallery(input, 300, 5);

      for (var i=0; i<result.length; i++) {
        for (var j=0; j<result[i].length; j++) {
            assert.equal(expected[i][j]["jg-height"], result[i][j]["jg-height"]);
            assert.equal(expected[i][j]["jg-width"], result[i][j]["jg-width"]);
            assert.equal(expected[i][j]["jg-marginleft"], result[i][j]["jg-marginleft"]);
        }
      }
    })

  })
})
