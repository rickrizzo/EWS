var fs = require('fs');
var xlsx = require('node-xlsx');

module.exports = {
  parseEWS: function(path) {
    var buffer = xlsx.parse(fs.readFileSync(path));
    var students = [];
    buffer[0].data.forEach(function(row, index) {
      if (index > 0) {
        students.push({
          'name': row[0].replace(/.*, /, ''),
          'reason': row[1],
          'hall': row[7],
          'room': row[8],
          'email': row[9]
        });
      }
    });
    return students;
  }
};
