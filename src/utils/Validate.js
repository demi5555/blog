export function required(value, message = "this field is required") {
  return value && String(value).trim() ? "" : message;
}
export function isEmail(value, message = "email is not valid") {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    String(value).trim(),
  )
    ? ""
    : message;
}

export function validate(value, rules = []) {
  console.log(rules);
  console.log("value: ", value);
  for (const rule of rules) {
    console.log(rule(value));

    let err = rule(value);
    if (err) return err;
  }
  return "";
}

export function validateArticle(form) {
  return {
    title: validate(form.title, [(v) => required(v, "Title is required")]),

    categoryId: validate(form.categoryId, [
      (v) => required(v, "Category is required"),
    ]),

    content: validate(form.content, [
      (v) => required(v, "Content is required"),
      (v) =>
        String(v || "").trim().length >= 10
          ? ""
          : "Content must be at least 10 characters",
    ]),
  };
}
export function hasError(errors) {
  return Object.values(errors).some((e) => e !== "");
}
