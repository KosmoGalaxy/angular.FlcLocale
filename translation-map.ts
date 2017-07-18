import * as _ from "lodash";

export class TranslationMap extends Map<string, string> {

  setTranslation(key: string, value: string) {
    this.set(key, value);
  }

  setTranslationsFromText(text: string) {
    const lines: string[] = _.split(_.trim(text), '\n');

    _.forEach(lines, line => {
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
    });
  }

  getTranslation(key: string): string {
    return this.get(key);
  }

}
