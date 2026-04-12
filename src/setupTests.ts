/* eslint-disable max-classes-per-file */
import '@testing-library/jest-dom';

// Mock window object for node environment
(global as any).window = {
  _config: {},
  hasTurboRangeOrder: false,
};

// Mock location object
(global as any).location = {
  href: 'http://localhost:3000',
  pathname: '/',
  search: '',
  hash: '',
};

// Mock document with full DOM API
const mockElement = {
  children: [],
  appendChild: jest.fn(function (this: any, child: any) {
    this.children.push(child);
    return child;
  }),
  removeChild: jest.fn(function (this: any, child: any) {
    const index = this.children.indexOf(child);
    if (index > -1) this.children.splice(index, 1);
    return child;
  }),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  setAttribute: jest.fn(),
  getAttribute: jest.fn(),
  querySelectorAll: jest.fn(() => []),
  querySelector: jest.fn(() => null),
};

(global as any).document = {
  createElement: jest.fn(() => ({ ...mockElement })),
  createElementNS: jest.fn(() => ({ ...mockElement })),
  createTextNode: jest.fn((text: string) => ({ nodeValue: text })),
  body: { ...mockElement },
  head: { ...mockElement },
  documentElement: { ...mockElement },
  getElementsByTagName: jest.fn(() => []),
  getElementById: jest.fn(() => null),
  querySelectorAll: jest.fn(() => []),
  querySelector: jest.fn(() => null),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

// Mock ResizeObserver
(global as any).ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock IntersectionObserver
(global as any).IntersectionObserver = class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
