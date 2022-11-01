const moment = require("moment");

module.exports = {
  formatDate: function (date, format) {
    return moment(date).format(format);
  },
  stripTags: function (input) {
    return input.replace(/<(?:.|\n)*?>/gm, " ");
  },
  truncate: function (str, len) {
    if (str.length > len && str.length > 0) {
      let new_str = str + " ";
      new_str = str.substr(0, len);
      new_str = str.substr(0, new_str.lastIndexOf(" "));
      new_str = new_str.length > 0 ? new_str : str.substr(0, len);
      return new_str + "...";
    }
    return str;
  },
  editIcon: function (songUser, loggedUser, songId, floating = true) {
    if (songUser._id.toString() == loggedUser._id.toString()){
      if (floating) {
        return (`<a href="/songs/edit/${songId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>` );
       
      } else {
        return (`<a href="/songs/edit/${songId}"><i class="fas fa-edit"></i></a>`);
      }
    } else {
      return "";
    }
  },
  editContactIcon: function (contactUser, loggedUser, contactId, floating = true) {
    if (contactUser._id.toString() == loggedUser._id.toString()){
      if (floating) {
        return (`<a href="/contacts/editContact/${contactId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>` );
      } else {
        return (`<a href="/contacts/editContacs/${contactId}"><i class="fas fa-edit"></i></a>` || `<a href="/contacts/edit/${contactId}"><i class="fas fa-edit"></i></a>`);
      }
    } else {
      return "";
    }
  },
  select: function (selected, options) {
    return options
      .fn(this)
      .replace(
        new RegExp(' value="' + selected + '"'),
        '$& selected="selected"'
      )
      .replace(
        new RegExp(">" + selected + "</option>"),
        ' selected="selected"$&'
      );
  },
};
