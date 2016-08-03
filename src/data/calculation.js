
function calcSleepEfficiency(sleeptime, getuptime, howlong) {
  if (sleeptime === 'unstable') return false;
  if (getuptime === 'unstable') return false;

  const result = howlong / getuptime - sleeptime;
  return result < 0.7;
}
