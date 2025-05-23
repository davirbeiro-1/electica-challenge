import { ExceptionName } from './custom.exception.enum';

const EXCEPTION_PREFIX = 'API';

export const exceptionMetadata = {
  INTERNAL_EXCEPTION: {
    status: 500,
    code: '0001',
    detail: 'Internal server exception',
  },
  VALIDATION_FAILED: {
    status: 422,
    code: '0003',
    detail: 'Input validation failed',
  },
  NOT_FOUND: {
    status: 404,
    code: '0005',
    detail: 'Entity could not be found',
  },
  ALREADY_EXISTS: {
    status: 409,
    code: '0006',
    detail: 'Entity already exists',
  },
  CONFLICT: {
    status: 409,
    code: '0007',
    detail: 'A request could not be processed due to a conflict',
  },
};

export const getAllCustomExceptionCodes = (): string[] => {
  return Object.values(exceptionMetadata).map(
    (meta) => `${EXCEPTION_PREFIX}-${meta.code}`,
  );
};

export const getAllCustomExceptionStatuses = (): number[] => {
  return Object.values(exceptionMetadata).map((meta) => meta.status);
};

export const getException = (name: ExceptionName, detail?: string): any => {
  const exception = Object.assign(
    {},
    exceptionMetadata[name] ?? exceptionMetadata.INTERNAL_EXCEPTION,
  );

  exception.code = `${EXCEPTION_PREFIX}-${exception.code}`;

  return Object.assign(exception, detail ? { detail: detail } : undefined);
};
