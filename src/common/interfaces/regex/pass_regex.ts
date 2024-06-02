export const pass_regex =
  // ^: Inicio de la línea
  // (?=.*[a-z]): Debe contener al menos un carácter en minúscula
  // (?=.*[A-Z]): Debe contener al menos un carácter en mayúscula
  // (?=.*\d): Debe contener al menos un dígito
  // (?=.*[$@$!%*?&]): Debe contener al menos uno de los siguientes caracteres especiales: $ @ $ ! % * ? &
  // ([A-Za-z\d$@$!%*?&]|[^ ]): Los caracteres permitidos son letras mayúsculas y minúsculas, dígitos, y los caracteres especiales $ @ $ ! % * ? &. No se permiten espacios.
  // {8,15}: La longitud de la contraseña debe estar entre 8 y 15 caracteres.
  // $: Fin de la línea
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
