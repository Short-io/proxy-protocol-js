import { INETProtocol } from './enum/INETProtocol';
import { Peer } from './Peer';

/**
 * V1ProxyProtocolParseError is an error class that is raised on parsing error occurs.
 */
export class V1ProxyProtocolParseError implements Error {
  public readonly name: string;

  public constructor(public readonly message: string) {
    this.name = this.constructor.name;
  }
}

/**
 * V1ProxyProtocol is a class that has responsibilities for building and parsing PROXY protocol V1.
 */
export class V1ProxyProtocol {
  private static readonly protocolSignature = 'PROXY';
  private static readonly v1ProxyProtocolRegexp = ((): RegExp => {
    const inetProtoMatcher = Object.keys(INETProtocol).join('|');
    return new RegExp(
      `^${V1ProxyProtocol.protocolSignature} (${inetProtoMatcher}) ([^ ]+) ([^ ]+) ([0-9]+) ([0-9]+)\r\n(.*)`,
      's',
    );
  })();

  /**
   * The constructor to instantiate an instance of V1ProxyProtocol class.
   *
   * @param inetProtocol
   * @param source
   * @param destination
   * @param data
   */
  public constructor(
    public readonly inetProtocol: INETProtocol,
    public readonly source: Peer,
    public readonly destination: Peer,
    public readonly data?: string,
  ) {}

  /**
   * Constructs a V1 PROXY protocol header.
   *
   * If the instance has data payload, this method appends data into the after of the header.
   */
  public build(): string {
    return `PROXY ${this.inetProtocol} ${this.source.ipAddress} ${this.destination.ipAddress} ${this.source.port} ${
      this.destination.port
    }\r\n${this.data ? this.data : ''}`;
  }

  /**
   * Parses a given input string as V1 PROXY protocol and returns the structure.
   *
   * If the given string is invalid, this method throws {@link V1ProxyProtocolParseError}.
   *
   * @param input
   */
  public static parse(input: string): V1ProxyProtocol {
    const matched = V1ProxyProtocol.v1ProxyProtocolRegexp.exec(input);
    if (!matched) {
      throw new V1ProxyProtocolParseError("given data isn't suitable for V1 PROXY protocols definition");
    }

    return new V1ProxyProtocol(
      INETProtocol[matched[1]],
      new Peer(matched[2], Number(matched[4])),
      new Peer(matched[3], Number(matched[5])),
      matched[6],
    );
  }

  /**
   * Returns the whether a given input string has a valid protocol signature or not.
   *
   * @param input
   */
  public static isValidProtocolSignature(input: string): boolean {
    return input.startsWith(V1ProxyProtocol.protocolSignature);
  }
}
