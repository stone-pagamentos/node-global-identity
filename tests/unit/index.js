import test from 'ava'
import globalIdentity from '../../dist'
import { Authorization } from '../../dist/authorization'
import { Management } from '../../dist/management'

test('GlobalIdentity: is function', t => {
  t.is(typeof globalIdentity, 'function')
}, 'should be of a function')

test('GlobalIdentity: return is object', t => {
  t.is(typeof globalIdentity(), 'object')
}, 'should be a object')

test('GlobalIdentity: return object has property Authorization of type Authorization', t => {
  const gim = globalIdentity();
  const authorization = gim.Authorization;

  t.true( authorization instanceof Authorization)
}, 'should be of the type Authorization')

test('GlobalIdentity: return object has property Management of type Management', t => {
  const gim = globalIdentity();
  const management = gim.Management;

  t.true( management instanceof Management)
}, 'should be of the type Management')
