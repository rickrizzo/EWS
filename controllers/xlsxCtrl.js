var fs = require('fs');
var xlsx = require('node-xlsx');

module.exports = {
  parseEWS: function(path) {
    var buffer = xlsx.parse(fs.readFileSync(path));
    var students = [];
    var emails = new Set();
    var indexes = {
      'name': -1,
      'reason': -1,
      'hall': -1,
      'room': -1,
      'email': -1
    }
    buffer[0].data.forEach(function(row, index) {
      if (index == 0) {
        row.forEach(function(col, index) {
          if (col.toLowerCase() in indexes) {
            indexes[col.toLowerCase()] = index
          }
          if (col.toLowerCase() == 'room number') { indexes['room'] = index; }
          if (col.toLowerCase() == 'warning') { indexes['reason'] = index; }
          if (col.toLowerCase() == 'residence hall') { indexes['hall'] = index; }
        });
      }
      if (index > 0 && !emails.has(row[indexes['email']])) {
        emails.add(row[indexes['email']]);
        student = {
          'name': row[indexes['name']].replace(/.*, /, ''),
          'reason': row[indexes['reason']],
          'hall': row[indexes['hall']],
          'room': row[indexes['room']],
          'email': row[indexes['email']]
        };
        students.push(student);
      }
    });
    return students;
  }
};
