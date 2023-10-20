class ValidationParams {
  createAndUpdateUser(sub, email, name, picture, goal, category_id, city, state, country) {
    const invalidFields = {};
    const parameters = [
      { param: sub, paramName: "sub" },
      { param: email, paramName: "email" },
      { param: name, paramName: "name" },
      { param: picture, paramName: "picture" },
      { param: goal, paramName: "goal" },
      { param: category_id, paramName: "category_id" },
      { param: city, paramName: "city" },
      { param: state, paramName: "state" },
      { param: country, paramName: "country" },
    ];

    for (const { param, paramName } of parameters) {
      if (!param) {
        invalidFields[paramName] = `Invalid ${paramName}`;
      }
    }

    return Object.keys(invalidFields).length === 0 ? null : invalidFields;
  }
}

module.exports = new ValidationParams();
