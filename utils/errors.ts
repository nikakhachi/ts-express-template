class ValidationError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}

type TypeCustomError = ValidationError;

export { TypeCustomError, ValidationError };
