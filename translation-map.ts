import * as _ from "lodash";

export class TranslationMap {

  private _map: Map<string, string> = new Map();

  setTranslation(key: string, value: string) {
    this._map.set(key, value);
  }

  setTranslationsFromText(text: string) {
    const lines: string[] = _.split(_.trim(text), '\n');
    _.forEach(lines, line => this._setLine(line));
  }

  getTranslation(key: string): string {
    return this._map.get(key);
  }

  private _setLine(line: string) {
    line = _.trim(line);
    if (!line)
      return;

    const parts: string[] = _.split(line, '=');
    if (parts.length != 2)
      return;

    const key: string = _.trim(parts[0]);
    const value: string = _.trim(parts[1]);
    if (!key || !value)
      return;

    this.setTranslation(key, value);
  }

}
