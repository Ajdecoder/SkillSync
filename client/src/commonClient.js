const PORT_LOCAL = "http://localhost:9002";
const PORT_PRODUCTON = import.meta.env.VITE_PORT_PRODUCTON;

export const PORT_CLIENT = PORT_PRODUCTON && import.meta.env.MODE === 'production' ? PORT_PRODUCTON : PORT_LOCAL;   