/**
 * Custom exception class for Movie API exceptions.
 */

import { HttpException, HttpStatus } from '@nestjs/common';

import { ExceptionName } from './custom.exception.enum';
import { ICustomExceptionInfo } from './exception-info.interface';
import { getException } from './metadata.exception';

export abstract class TicketApiException extends HttpException {
  public exceptionName: ExceptionName;
  public exceptionInfo: ICustomExceptionInfo;

  constructor(
    exceptionName: ExceptionName,
    message: string,
    statusCode: number,
  ) {
    super(
      {
        exceptionName: exceptionName,
        exceptionInfo: getException(exceptionName),
        message: message, // Use a propriedade 'message' padrão do HttpException
      },
      statusCode,
    );
    this.exceptionName = exceptionName;
    this.exceptionInfo = getException(exceptionName);
    this.exceptionInfo.detail = message;
  }

  public toString = (): string => {
    return `${this.exceptionName} exception:\n${this.exceptionInfo}`;
  };
}

export class TicketApiNotFoundException extends TicketApiException {
  constructor(message: string) {
    super(ExceptionName.NOT_FOUND, message, HttpStatus.BAD_REQUEST);
  }
}

export class TicketApiConflictException extends TicketApiException {
  constructor(message: string) {
    super(ExceptionName.CONFLICT, message, HttpStatus.BAD_REQUEST);
  }
}

export class TicketApiValidationException extends TicketApiException {
  constructor(message: string) {
    super(ExceptionName.VALIDATION_FAILED, message, HttpStatus.BAD_REQUEST);
  }
}

export class TicketApiInternalException extends TicketApiException {
  constructor(message: string) {
    super(ExceptionName.INTERNAL_EXCEPTION, message, 404);
  }
}

export class TicketApiItemAlreadyExistsException extends TicketApiException {
  constructor(message: string) {
    super(ExceptionName.ALREADY_EXISTS, message, HttpStatus.BAD_REQUEST);
  }
}

export class TicketPropertyMissingException extends TicketApiException {
  constructor(property: string) {
    super(
      ExceptionName.MISSING_PROPERTY,
      `Required property '${property}' is missing.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
