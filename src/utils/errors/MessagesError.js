export const generatorUserError = (user) => {
    return `One or more of the following fields are invalid or incomplete.
    List of required fields:
      - firstName : ${user.nombre}
      - lastName  : ${user.apellido}
      - email     : ${user.email}
      - dni     : ${user.dni}
      - edad       : ${user.edad}
      `
    }