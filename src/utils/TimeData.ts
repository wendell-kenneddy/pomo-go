export class TimeData {
  public readonly SECONDS_IN_MS = 1000;
  public readonly MINUTES_IN_MS = 1000 * 60;
  public readonly HOURS_IN_MS = 1000 * 60 * 60;

  getMinutes(milliseconds: number) {
    const date = new Date(milliseconds);

    if (milliseconds == this.HOURS_IN_MS) return '60:00';

    return date.toLocaleTimeString('pt-br', {
      minute: '2-digit',
      second: '2-digit'
    });
  }
}
