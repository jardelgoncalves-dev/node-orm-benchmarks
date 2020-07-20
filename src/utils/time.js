module.exports = class Time {
  times = {};
  init(key) {
    const [pos1, pos2] = process.hrtime()
    const ms = (pos1 * 1000000 + pos2 / 1000) / 1000
    this.times[key] = ms;
  }

  finished(key) {
    const start = this.times[key]
    if (!start) return 0;

    const [pos1, pos2] = process.hrtime()
    const ms = (pos1 * 1000000 + pos2 / 1000) / 1000

    const result = (ms - start).toFixed(3);
    this.times[key] = undefined

    return result
  }
}