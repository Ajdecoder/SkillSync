const localhost = "http://localhost:9002";
const prod_port = 'https://app-skillsync.vercel.app/';

export const PORT = prod_port ? prod_port : localhost;
