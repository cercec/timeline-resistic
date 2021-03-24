var dateFormat = require('dateformat');

dateFormat.i18n = {
  dayNames: [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
    'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'
  ],
  monthNames: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ],
  timeNames: [
    'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
  ]
};

export const dateFormatter = (date) => {
  return date && dateFormat(date, "dd mmmm yyyy");
}