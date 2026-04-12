export default function getTimeZone() {
  const x = new Date();
  const currentTimeZoneOffsetInHours = x.getTimezoneOffset() / 60;

  if (currentTimeZoneOffsetInHours === 0) {
    return 'UTC';
  }
  return currentTimeZoneOffsetInHours < 0
    ? `UTC+${-currentTimeZoneOffsetInHours}`
    : `UTC${-currentTimeZoneOffsetInHours}`;
}

const map = {
  t0: 'Etc/UTC',
  't-10': 'Pacific/Honolulu',
  't-8': 'America/Juneau',
  't-7': 'America/Los_Angeles',
  't-6': 'America/El_Salvador',
  't-5': 'America/Bogota',
  't-4': 'America/Caracas',
  't-3': 'America/Argentina/Buenos_Aires',
  t1: 'Africa/Lagos',
  t2: 'Europe/Belgrade',
  t3: 'Europe/Zurich',
  t4: 'Asia/Dubai',
  t5: 'Asia/Ashkhabad',
  t6: 'Asia/Almaty',
  t7: 'Asia/Bangkok',
  t8: 'Asia/Chongqing',
  t9: 'Asia/Seoul',
  t10: 'Australia/Brisbane',
  t11: 'Pacific/Norfolk',
  t12: 'Pacific/Auckland',
  t13: 'Pacific/Fakaofo',
};

export function getTimeZoneStr() {
  const x = new Date();
  const currentTimeZoneOffsetInHours = x.getTimezoneOffset() / 60;
  if (currentTimeZoneOffsetInHours === 0) {
    return 'Etc/UTC';
  }
  return map[`t${-currentTimeZoneOffsetInHours}`] || 'Etc/UTC';
}
