/* Does the necessary calculations for a justified gallery. */

var adjustrow = function(row, overflow) {
  var remainingOverflow = overflow;

  // sum up the total width
  var totalWidth = 0;
  for (var i=0; i<row.length; i++) {
    totalWidth += row[i].width;
  }

  // calculate adjusted width
  for (var i=0; i<row.length; i++) {
    var img = row[i];
    var rowWeight = (img.width*1.0) / totalWidth;
    var currentOverflow = Math.floor(rowWeight * overflow);
    remainingOverflow -= currentOverflow;

    img["jg-width"] = img.width - currentOverflow;
    img["jg-height"] = img.height;
  }

  // distribute remaining overflow
  while (remainingOverflow > 0) {
    for (var i=0; i<row.length; i++) {
      var img = row[i];
      img["jg-width"] = img["jg-width"] - 1;
      remainingOverflow--;
      if (remainingOverflow <= 0) break;
    }
  }

  // calculate margins
  for (var i=0; i<row.length; i++) {
    var img = row[i];
    img["jg-marginleft"] = -Math.floor((img.width - img["jg-width"]) / 2.0);
  }

  return row;
}

exports.justgallery = function(images, width, padding) {
  var currentWidth = 0,
      currentRow = [],
      rows = [];

  for (var i=0; i<images.length; i++) {
    var img = images[i];

    currentRow.push(img);
    currentWidth += img.width;

    if (currentWidth >= width) {
      var overflow = currentWidth - width;
      var adjustedRow = adjustrow(currentRow, overflow);
      rows.push(adjustedRow);
      currentRow = [];
      currentWidth = 0;
    } else {
      currentWidth += padding;
    }

  }

  if (currentRow.length > 0) {
    var adjustedRow = adjustrow(currentRow, 0);
    rows.push(adjustedRow);
  }

  return rows;
}

