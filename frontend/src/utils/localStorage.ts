export function setLastClient(clientId: number) {
  localStorage.setItem('dpc_prova--last-client', String(clientId));
}

export function getLastClient(): number | null {
  const lastClient = localStorage.getItem('dpc_prova--last-client');
  return lastClient ? Number(lastClient) : null;
}
