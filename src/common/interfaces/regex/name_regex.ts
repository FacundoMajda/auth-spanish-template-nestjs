export const name_regex =
  // ^: Inicio de la línea
  // (?=[a-zA-Z0-9._]{8,20}$): Asegura que la cadena completa tenga entre 8 y 20 caracteres, y que solo contenga letras (mayúsculas o minúsculas), números, puntos (.) y guiones bajos (_).
  // (?!.*[_.]{2}): Asegura que no haya dos puntos (.) o guiones bajos (_) consecutivos en la cadena.
  // [^_.]: Asegura que la cadena no comience con un punto (.) o un guión bajo (_).
  // .*: Permite cualquier cantidad de cualquier carácter (excepto una nueva línea).
  // [^_.]$: Asegura que la cadena no termine con un punto (.) o un guión bajo (_).
  /^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
