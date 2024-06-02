import { ErrorDictionary } from '../interfaces/errors.interface';

// Definición de errores de validación
export const ERRORS: ErrorDictionary = {
  VALIDATION: {
    INVALID_INPUT: {
      CODE: 'VA01',
      MESSAGE: 'Datos de entrada no válidos.',
    },
    MISSING_REQUIRED_FIELDS: {
      CODE: 'VA02',
      MESSAGE: 'Campos obligatorios faltantes.',
    },
    INVALID_FORMAT: {
      CODE: 'VA03',
      MESSAGE: 'Formato de datos no válido.',
    },
  },

  // Definición de errores de base de datos
  DATABASE: {
    CONNECTION_ERROR: {
      CODE: 'DB01',
      MESSAGE: 'Error de conexión a la base de datos.',
    },
    QUERY_FAILED: {
      CODE: 'DB02',
      MESSAGE: 'La consulta a la base de datos falló.',
    },
    RECORD_NOT_FOUND: {
      CODE: 'DB03',
      MESSAGE: 'Registro no encontrado en la base de datos.',
    },
    DUPLICATE_RECORD: {
      CODE: 'DB04',
      MESSAGE: 'Registro duplicado en la base de datos.',
    },
  },

  // Definición de errores de autenticación
  AUTHENTICATION: {
    INVALID_CREDENTIALS: {
      CODE: 'AU01',
      MESSAGE: 'Credenciales no válidas.',
    },
    UNAUTHORIZED: {
      CODE: 'AU02',
      MESSAGE: 'No autorizado.',
    },
    TOKEN_EXPIRED: {
      CODE: 'AU03',
      MESSAGE: 'Token expirado.',
    },
    TOKEN_INVALID: {
      CODE: 'AU04',
      MESSAGE: 'Token no válido.',
    },
  },

  // Definición de errores de autorización
  AUTHORIZATION: {
    FORBIDDEN: {
      CODE: 'AR01',
      MESSAGE: 'Acceso prohibido.',
    },
    INSUFFICIENT_PERMISSIONS: {
      CODE: 'AR02',
      MESSAGE: 'Permisos insuficientes.',
    },
  },

  // Definición de errores de servidor
  SERVER: {
    INTERNAL_ERROR: {
      CODE: 'SE01',
      MESSAGE: 'Error interno del servidor.',
    },
    SERVICE_UNAVAILABLE: {
      CODE: 'SE02',
      MESSAGE: 'Servicio no disponible.',
    },
  },

  // Definición de errores de archivos
  FILE: {
    INVALID_FILE_FORMAT: {
      CODE: 'FI01',
      MESSAGE: 'El formato del archivo no es válido.',
    },
    FILE_SIZE_EXCEEDED: {
      CODE: 'FI02',
      MESSAGE: 'El tamaño del archivo excede el límite permitido.',
    },
  },

  // Definición de errores de usuario
  USER: {
    EMAIL_ALREADY_EXISTS: {
      CODE: 'US01',
      MESSAGE: 'El correo electrónico ya está en uso por otro usuario.',
    },
    USERNAME_ALREADY_EXISTS: {
      CODE: 'US02',
      MESSAGE: 'El nombre de usuario ya está en uso por otro usuario.',
    },
    PASSWORD_WEAK: {
      CODE: 'US03',
      MESSAGE:
        'La contraseña es débil y no cumple con los requisitos mínimos de seguridad.',
    },
  },

  // Definición de errores de sesión
  SESSION: {
    SESSION_EXPIRED: {
      CODE: 'SE03',
      MESSAGE: 'La sesión ha expirado.',
    },
    INVALID_SESSION: {
      CODE: 'SE04',
      MESSAGE: 'La sesión no es válida.',
    },
    SESSION_NOT_FOUND: {
      CODE: 'SE05',
      MESSAGE: 'No se encontró la sesión.',
    },
  },

  // Definición de errores de seguridad
  SECURITY: {
    CSRF_TOKEN_INVALID: {
      CODE: 'SC01',
      MESSAGE: 'El token CSRF no es válido.',
    },
    XSS_ATTACK_DETECTED: {
      CODE: 'SC02',
      MESSAGE: 'Se detectó un intento de ataque XSS (Cross-Site Scripting).',
    },
  },

  // Definición de errores de API
  API: {
    ENDPOINT_NOT_FOUND: {
      CODE: 'AP01',
      MESSAGE: 'El punto final de la API solicitado no se encontró.',
    },
    METHOD_NOT_ALLOWED: {
      CODE: 'AP02',
      MESSAGE:
        'El método de solicitud HTTP no está permitido para este punto final de la API.',
    },
    INVALID_REQUEST: {
      CODE: 'AP03',
      MESSAGE: 'La solicitud realizada a la API no es válida.',
    },
  },

  // Definición de errores de configuración
  CONFIGURATION: {
    CONFIGURATION_ERROR: {
      CODE: 'CF01',
      MESSAGE: 'Error en la configuración de la aplicación.',
    },
    MISSING_CONFIGURATION: {
      CODE: 'CF02',
      MESSAGE: 'Configuración faltante o incompleta.',
    },
  },

  // Definición de errores de servicios externos
  EXTERNAL_SERVICE: {
    EXTERNAL_SERVICE_UNAVAILABLE: {
      CODE: 'ES01',
      MESSAGE: 'El servicio externo necesario no está disponible.',
    },
    EXTERNAL_SERVICE_TIMEOUT: {
      CODE: 'ES02',
      MESSAGE:
        'Tiempo de espera al intentar comunicarse con un servicio externo.',
    },
  },

  // Definición de errores de operaciones asíncronas
  ASYNC_OPERATION: {
    ASYNC_OPERATION_FAILED: {
      CODE: 'AO01',
      MESSAGE: 'Fallo en una operación asíncrona.',
    },
    ASYNC_OPERATION_TIMEOUT: {
      CODE: 'AO02',
      MESSAGE: 'La operación asíncrona ha excedido el tiempo de espera.',
    },
  },

  // Definición de errores de entrada/salida
  IO: {
    IO_ERROR: {
      CODE: 'IO01',
      MESSAGE:
        'Error de entrada/salida al manipular archivos u otros recursos.',
    },
  },

  // Definición de errores de red
  NETWORK: {
    NETWORK_ERROR: {
      CODE: 'NT01',
      MESSAGE: 'Error de red al intentar comunicarse con otros sistemas.',
    },
  },

  // Definición de errores de caché
  CACHE: {
    CACHE_READ_ERROR: {
      CODE: 'CA01',
      MESSAGE: 'Error al intentar leer desde la caché.',
    },
    CACHE_WRITE_ERROR: {
      CODE: 'CA02',
      MESSAGE: 'Error al intentar escribir en la caché.',
    },
  },

  // Definición de errores de mensajería
  MESSAGING: {
    MESSAGE_SEND_ERROR: {
      CODE: 'MS01',
      MESSAGE: 'Error al intentar enviar un mensaje.',
    },
  },
};
