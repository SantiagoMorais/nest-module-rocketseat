export class Slug {
  public value: string;
  private constructor(value: string) {
    this.value = value;
  }

  static create(slug: string) {
    return new Slug(slug);
  }

  /**
   * Receives a string and normalize it as a slug.
   *
   * Example: "An example title" => "an-example-title"
   *
   * @param text {string}
   */
  static createFromText(text: string) {
    const slugText = text
      .normalize("NFKD") // normalize the accent characters to your base forms
      .toLowerCase() // convert string to lower case
      .trim() // remove extra spaces at the end and at the beginning of the string
      .replace(/\s+/g, "-") // change all internal spaces into "-"
      .replace(/[^\w-]+/g, "") // remove any non-alphanumeric character except "-"
      .replace(/_/g, "-") // replace any underscore by "-"
      .replace(/--+/g, "-") // replace any double "-" by single "-"
      .replace(/-$/g, ""); // remove "-" if it is at the end of the string

    return new Slug(slugText);
  }
}
