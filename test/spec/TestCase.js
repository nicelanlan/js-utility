describe('util.js', function() {

  describe('util.clone', function() {
    var originObj;
    var copyObj;

    beforeEach(function() {
      originObj = {
        name: 'Hamburger',
        age: 1,
        family: [
          {
            relationship: 'Dad',
            name: 'Vincent',
            age: 30
          },
          {
            relationship: 'Mom',
            name: 'Frieda',
            age: 28
          }
        ],
        hobby: {
          '3m': 'hug',
          '6m': 'sit',
          '7m': 'crawl'
        }
      };
      copyObj = clone(originObj);
    });

    it('should be able to copy properties', function() {
      
      expect(copyObj.name).toEqual(originObj.name);
      expect(copyObj.age).toEqual(originObj.age);

    });


    it('should be able to create a sub-object', function() {
      expect(copyObj).toEqual(originObj);
      expect(copyObj === originObj).toBe(false);
      expect(copyObj.family === originObj.family).toBe(false);
      expect(copyObj.hobby === originObj.hobby).toBe(false);
    });

    it('should not be able to modify origin literal properties', function() {
      var newObj = clone(originObj);

      newObj.name = 'modified';
      newObj.age = 20;

      expect(newObj).not.toEqual(originObj);
      expect(newObj.name).not.toEqual(originObj.name);
      expect(newObj.age).not.toEqual(originObj.age);
      
    });

    it('should not be able to modify origin array or object properties', function() {
      var newObj = clone(originObj);
      newObj.family[0].age = 29;
      newObj.hobby.add = 'add hobby';

      expect(newObj).not.toEqual(originObj);
      expect(newObj.family[0].age).not.toEqual(originObj.family[0].age);
      expect(newObj.hobby.add).not.toEqual(originObj.hobby.add);
      
    });
  });

  describe('util.copy', function() {
    var originObj;
    var copyObj;

    beforeEach(function() {
      originObj = {
        name: 'Hamburger',
        age: 1,
        family: [
          {
            relationship: 'Dad',
            name: 'Vincent',
            age: 30
          },
          {
            relationship: 'Mom',
            name: 'Frieda',
            age: 28
          }
        ],
        hobby: {
          '3 month': 'hug',
          '6 month': 'sit',
          '7 month': 'crawl'
        }
      };
      copyObj = copy(originObj);
    });

    it('should be able to copy properties', function() {
      
      expect(copyObj.name).toEqual(originObj.name);
      expect(copyObj.age).toEqual(originObj.age);

    });

    it('should not be able to create a sub-object', function() {
      expect(copyObj).toEqual(originObj);
      expect(copyObj.family === originObj.family).toBe(true);
      expect(copyObj.hobby === originObj.hobby).toBe(true);
    });

    it('should not be able to modify origin literal properties', function() {
      var newObj = copy(originObj);
      console.log(newObj);
      newObj.name = 'modified';
      newObj.age = 20;

      expect(newObj).not.toEqual(originObj);
      expect(newObj.name).not.toEqual(originObj.name);
      expect(newObj.age).not.toEqual(originObj.age);
      
    });

    it('should be able to modify origin array or object properties', function() {
      var newObj = copy(originObj);
      newObj.family[0].age = 29;
      newObj.hobby.add = 'add hobby';

      expect(newObj).toEqual(originObj);
      expect(newObj.family[0].age).toEqual(originObj.family[0].age);
      expect(newObj.hobby.add).toEqual(originObj.hobby.add);
      
    });
  });

  describe('util.parseQueryString2Object', function() {
    var queryString = 'a=1&b=2&c=3&d=4#999',
        queryObj;

    beforeEach(function() {
      queryObj = parseQueryString2Object(queryString);
    });

    it('should be an object', function() {
      expect(typeof queryObj).toBe('object');
    });

    it('should be able to parse', function() {

      expect(queryObj.a).toEqual('1');
      expect(queryObj.b).toEqual('2');
      expect(queryObj.c).toEqual('3');

    });

    it('should not be able to split "#"', function() {
      expect(queryObj.d).not.toEqual('4');
      expect(queryObj.d).toEqual('4#999');
    });

  });

});
