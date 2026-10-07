import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ProofModule } from "./app.js";
import { assertExecutionAuthorized } from "./execution-authorization.js";

assertExecutionAuthorized();

const app = await NestFactory.create(ProofModule, { logger: false });
await app.listen(43101, "127.0.0.1");
