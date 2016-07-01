import utm from 'utm-bugfix'

export default function(input) {
  let parsingFunc = pickParser(input)
  return parsingFunc(input)
}

function fromDecimalDegrees(input) {
  let coordinates = input.replace(',',' ').replace(/\s+/g, ' ').split(' ')
  return {
    lat: parseFloat(coordinates[0]),
    lng: parseFloat(coordinates[1])
  }
}

function fromDecimalMinutes(input) {
  let coordinates = input.replace(',',' ').replace(/\s+/g, ' ').split(' ')
  let lat = [coordinates[0], coordinates[1]]
  let lng = [coordinates[2], coordinates[3]]

  function getSign(input) {
    return parseFloat(input) > 0 ? 1 : -1
  }

  return {
    lat: parseFloat(lat[0]) + getSign(lat[0]) * parseFloat(lat[1])/60,
    lng: parseFloat(lng[0]) + getSign(lng[0]) * parseFloat(lng[1])/60
  }
}

function fromMinutesSeconds(input) {
  // remove spaces before NSEW
  let coordinates = input.replace(/\s(\D)/g,"$1").split(' ')
  let lat = coordinates[0].trim().match(/^(\d+)°(\d+)'(\d+(\.\d+))?"([NS])/)
  let lng = coordinates[1].trim().match(/^(\d+)°(\d+)'(\d+(\.\d+))?"([EW])/)

  let toDecimal = function(minutes, seconds) {
    let number = (parseFloat(minutes) * 60 + parseFloat(seconds))/3600
    // + to convert string to a number
    return +(number.toFixed(5))
  }

  let getSign = function(direction) {
    return direction === 'N' || direction === 'E' ? 1 : -1
  }

  return {
    lat: getSign(lat[5])*(parseFloat(lat[1]) + toDecimal(lat[2], lat[3])),
    lng: getSign(lng[5])*(parseFloat(lng[1]) + toDecimal(lng[2], lng[3]))
  }
}

function fromUtm(input) {
 let match = input.match(/^(\d{2})([C-X]) (\d+(\.\d+)?) (\d+(\.\d+)?)$/)
 let easting = parseFloat(match[3])
 let northing = parseFloat(match[5])
 let zoneNumber = parseInt(match[1])
 let zoneLetter = match[2]
 let coordinates = utm.toLatLon(easting, northing, zoneNumber, zoneLetter)
 return {
   lat: +(coordinates.latitude.toFixed(5)),
   lng: +(coordinates.longitude.toFixed(5))
 }
}

function pickParser(input) {
  if (input.match(/^[-+]?\d+(\.\d+)?,?\s*[-+]?\d+(\.\d+)?$/)){
    return fromDecimalDegrees
  } else if (input.match(/^[-+]?\d+ \d+(\.\d+)?,?\s*[-+]?\d+ \d+(\.\d+)?$/)){
    return fromDecimalMinutes
  } else if (input.match(/^\d+°\d+'\d+(\.\d+)?"\s*[NS]\s*\d+°\d+'\d+(\.\d+)?"\s*[EW]$/)){
    return fromMinutesSeconds
  } else if (input.match(/^\d{2}[C-X] \d+(\.\d+)? \d+(\.\d+)?$/)){
    return fromUtm
  } else return () => {return null}
}
