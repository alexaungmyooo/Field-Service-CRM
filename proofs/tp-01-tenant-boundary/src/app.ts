import "reflect-metadata";
import {
  Controller,
  ForbiddenException,
  Get,
  Injectable,
  Module,
  Param,
  Post,
  Req,
} from "@nestjs/common";
import { BackgroundAuthorizationAdapter } from "./background.js";
import { ProofAuditWriter } from "./audit.js";
import { ContextResolutionError, SecurityContextResolver } from "./context.js";
import { ProofDatabase } from "./database.js";
import { PlatformDirectoryRepository } from "./platform-directory.js";
import { MachineAuthorityVerifier } from "./machine.js";
import { ProofPathExecutor } from "./path-executor.js";
import { ProofAuthorizationPolicy } from "./policy.js";
import { TenantResourceRepository } from "./repository.js";
import { SupportGrantVerifier } from "./support.js";
import type { SecurityContext, SyntheticRequestInput } from "./types.js";

interface MinimalRequest {
  readonly headers: Readonly<Record<string, string | string[] | undefined>>;
}

function header(request: MinimalRequest, name: string): string | null {
  const value = request.headers[name];
  return Array.isArray(value) ? value[0] ?? null : value ?? null;
}

@Injectable()
export class RequestContextAdapter {
  constructor(private readonly resolver: SecurityContextResolver) {}

  fromRequest(request: MinimalRequest): SecurityContext {
    const input: SyntheticRequestInput = {
      token: header(request, "x-tp01-token"),
      requestedOrganizationKey: header(request, "x-tp01-organization"),
      hostOrganizationKey: header(request, "x-tp01-host-organization"),
      purpose: header(request, "x-tp01-purpose"),
      correlationId: header(request, "x-tp01-correlation-id"),
      caseId: header(request, "x-tp01-case-id"),
      supportGrantClaim: header(request, "x-tp01-support-grant"),
      machineJobClaim: header(request, "x-tp01-machine-job"),
    };
    try {
      return this.resolver.resolve(input);
    } catch (error) {
      if (error instanceof ContextResolutionError) throw new ForbiddenException(error.message);
      throw error;
    }
  }
}

@Controller("tp01")
export class ProofController {
  constructor(
    private readonly contexts: RequestContextAdapter,
    private readonly resources: TenantResourceRepository,
    private readonly directory: PlatformDirectoryRepository,
  ) {}

  @Get("resources/:id")
  async resource(@Req() request: MinimalRequest, @Param("id") id: string) {
    const context = this.contexts.fromRequest(request);
    const result = await this.resources.findById(context, id);
    if (!result) throw new ForbiddenException("not authorized or not found");
    return result;
  }

  @Get("resources/by-key/:key")
  async resourceByKey(@Req() request: MinimalRequest, @Param("key") key: string) {
    const context = this.contexts.fromRequest(request);
    const result = await this.resources.findByDisplayKey(context, key);
    if (!result) throw new ForbiddenException("not authorized or not found");
    return result;
  }

  @Post("resources/by-key/:key/touch")
  async touchResourceByKey(@Req() request: MinimalRequest, @Param("key") key: string) {
    const context = this.contexts.fromRequest(request);
    const updated = await this.resources.touchByDisplayKey(context, key);
    if (!updated) throw new ForbiddenException("not authorized or not found");
    return { updated: true };
  }

  @Get("organizations")
  async organizations(@Req() request: MinimalRequest) {
    const context = this.contexts.fromRequest(request);
    return this.directory.list(context);
  }
}

@Module({
  controllers: [ProofController],
  providers: [
    SecurityContextResolver,
    RequestContextAdapter,
    ProofAuthorizationPolicy,
    ProofDatabase,
    TenantResourceRepository,
    PlatformDirectoryRepository,
    SupportGrantVerifier,
    MachineAuthorityVerifier,
    ProofAuditWriter,
    ProofPathExecutor,
    BackgroundAuthorizationAdapter,
  ],
})
export class ProofModule {}
