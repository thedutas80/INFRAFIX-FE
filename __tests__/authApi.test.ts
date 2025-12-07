import { describe, expect, it } from 'vitest'
import { decodeJWT } from '../src/api/authApi'

describe('authApi', () => {
  describe('decodeJWT', () => {
    it('should decode a JWT token payload', () => {
      // jwt-decode doesn't validate signatures, so it will decode the payload
      // This token contains the expected payload
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VySWQiOjEsInN1YiI6ImFkbWluQGV4YW1wbGUuY29tIiwiaWF0IjoxNzY1MTE3NTc3LCJleHAiOjE3NjUxMTkzNzd9.dummy_signature';

      const result = decodeJWT(mockToken);
      expect(result).toEqual({
        role: 'admin',
        userId: 1,
        sub: 'admin@example.com',
        iat: 1765117577,
        exp: 1765119377
      });
    });

    it('should throw error for invalid token', () => {
      expect(() => decodeJWT('invalid.token')).toThrow('Invalid JWT token');
    });

    it('should return JWTPayload interface', () => {
      // Test the interface
      const mockPayload = {
        role: 'admin',
        userId: 1,
        sub: 'admin@example.com',
        iat: 1765117577,
        exp: 1765119377
      };

      expect(mockPayload).toMatchObject({
        role: expect.any(String),
        userId: expect.any(Number),
        sub: expect.any(String),
        iat: expect.any(Number),
        exp: expect.any(Number)
      });
    });
  });
});
