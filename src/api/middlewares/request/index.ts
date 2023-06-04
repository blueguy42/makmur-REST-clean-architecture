import express, { Application } from 'express';
import helmet from 'helmet';

export function onRequest({ app }: { app: Application }) {
  app.use(helmet());
  app.use(express.json());
  app.use('/health', (_req, res) => res.status(200).send('OK'));
}
