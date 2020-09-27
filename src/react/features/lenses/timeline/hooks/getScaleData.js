import { getLongitudeDate, getTimelineData } from './getTimelineData'

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function resolveDateArray(days, date) {
  return [
    days <= 365*20 ? date.getFullYear() : Math.round(date.getFullYear()/10) * 10,
    days <= 365*2 ? date.getUTCMonth() : 0,
    days <= 50 ? date.getUTCDate() : 1,
    days <= 2 ? date.getUTCHours() : 0,
  ]
}

function addHours(date, hours) {
  var result = new Date(date);
  result.setUTCHours(result.getUTCHours() + hours);
  return result;
}

function addDays(date, days) {
  var result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

function addMonths(date, days) {
  var result = new Date(date);
  result.setUTCMonth(result.getUTCMonth() + days);
  return result;
}

function addYears(date, days) {
  var result = new Date(date);
  result.setUTCFullYear(result.getUTCFullYear() + days);
  return result;
}

function getBoundMarkers(date, length, type) {
  return { date, label: date.toISOString().slice(0,length), type }
}

function resolveScale(days, min, max) {
  const minMarker = new Date(Date.UTC(...resolveDateArray(days, min)))
  const maxMarker = new Date(Date.UTC(...resolveDateArray(days, max)))
  if (days <= 2) {
    return [...Array((days + 1)*24).keys()]
      .map((index) => addHours(minMarker, index + 1))
      .map((date) => ({ date, label: ('0' + date.getUTCHours()).slice(-2) }))
      .concat(getBoundMarkers(addHours(minMarker, 1), 10, 'min'))
      .concat(getBoundMarkers(maxMarker, 10, 'max'))
  }
  if (days <= 50) {
    return [...Array(days).keys()]
      .map((index) => addDays(minMarker, index + 1))
      .map((date) => ({ date, label: ('0' + date.getUTCDate()).slice(-2) }))
      .concat(getBoundMarkers(addDays(minMarker, 1),7,'min'))
      .concat(getBoundMarkers(maxMarker, 7,'max'))
  }
  if (days <= 365*2) {
    return [...Array(Math.round(days/30) + 1).keys()]
      .map((index) => addMonths(minMarker, index))
      .map((date) => ({ date, label: ('0' + (date.getUTCMonth() + 1)).slice(-2) }))
      .concat(getBoundMarkers(addMonths(minMarker, 1),4,'min'))
      .concat(getBoundMarkers(maxMarker, 4,'max'))
  }
  if (days <= 365*20) {
    return [...Array(Math.round(days/30) + 1).keys()]
      .map((index) => addYears(minMarker, index))
      .map((date) => ({ date, label: date.getUTCFullYear() }))
  }
  return [...Array(Math.round(days/(365*10)) + 1).keys()]
    .map((index) => addYears(minMarker, index*10))
    .map((date) => ({ date, label: date.getUTCFullYear() }))
}

export function getScaleData({ min, max }) {
  const minDate = getLongitudeDate(min)
  const maxDate = getLongitudeDate(max)
  const diffDate = dateDiffInDays(minDate, maxDate)
  const scale = resolveScale(diffDate, minDate, maxDate)
  return scale.map(({ date, label, type }) => ({
    ...getTimelineData({ diory: { date } }),
    id: date,
    label,
    type,
  }))
}