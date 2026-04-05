//  Duración total de la sesión: 2 minutos (120 segundos)
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

//  Ventana de advertencia: Avisar cuando falten 30 segundos para expirar
export const SESSION_WARNING_WINDOW_MS = 15 * 60 * 1000;

//  Límite (throttle) de actualización: Solo permitir refrescar la sesión 1 vez cada 15 segundos
export const SESSION_ACTIVITY_REFRESH_THROTTLE_MS = 30 * 60 * 1000;

//  Consideramos al usuario "activo" si interactuo en los ultimos 5 minutos
export const SESSION_ACTIVE_USER_WINDOW_MS = 5 * 60 * 1000;
