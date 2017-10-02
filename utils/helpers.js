export function isBetween (num, x, y) {
  if (num >= x && num <= y) {
    return true
  }

  return false
}

export function calculateDirection (heading) {
  let direction = ''

  if (isBetween(heading, 0, 22.5)) {
    direction = 'North'
  } else if (isBetween(heading, 22.5, 67.5)) {
    direction = 'North East'
  } else if (isBetween(heading, 67.5, 112.5)) {
    direction = 'East'
  } else if (isBetween(heading, 112.5, 157.5)) {
    direction = 'South East'
  } else if (isBetween(heading, 157.5, 202.5)) {
    direction = 'South'
  } else if (isBetween(heading, 202.5, 247.5)) {
    direction = 'South West'
  } else if (isBetween(heading, 247.5, 292.5)) {
    direction = 'West'
  } else if (isBetween(heading, 292.5, 337.5)) {
    direction = 'North West'
  } else if (isBetween(heading, 337.5, 360)) {
    direction = 'North'
  } else {
    direction = 'Calculating'
  }

  return direction
}

export function timeToString (time = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}
Finally, paste the following code inside of your utils/_calendar.js file.

// utils/_calendar.js

import { AsyncStorage } from 'react-native'
import { getMetricMetaInfo, timeToString } from './helpers'

export const CALENDAR_STORAGE_KEY = 'UdaciFitness:calendar'

function getRandomNumber (max) {
 return Math.floor(Math.random() * max) + 0
}

function setDummyData () {
 const { run, bike, swim, sleep, eat } = getMetricMetaInfo()

 let dummyData = {}
 const timestamp = Date.now()

 for (let i = -183; i < 0; i++) {
   const time = timestamp + i * 24 * 60 * 60 * 1000
   const strTime = timeToString(time)
   dummyData[strTime] = getRandomNumber(3) % 2 === 0
     ? {
         run: getRandomNumber(run.max),
         bike: getRandomNumber(bike.max),
         swim: getRandomNumber(swim.max),
         sleep: getRandomNumber(sleep.max),
         eat: getRandomNumber(eat.max),
       }
     : null
 }

 AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(dummyData))

 return dummyData
}

function setMissingDates (dates) {
 const length = Object.keys(dates).length
 const timestamp = Date.now()

 for (let i = -183; i < 0; i++) {
   const time = timestamp + i * 24 * 60 * 60 * 1000
   const strTime = timeToString(time)

   if (typeof dates[strTime] === 'undefined') {
     dates[strTime] = null
   }
 }

 return dates
}

export function formatCalendarResults (results) {
 return results === null
   ? setDummyData()
   : setMissingDates(JSON.parse(results))
}
