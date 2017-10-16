import test from 'ava'
import globalIdentity from '../../dist'
import { Authorization } from '../../dist/authorization'
import { Management } from '../../dist/management'


const gim = globalIdentity();
const management = gim.Management
const authorization = gim.Authorization

test('GlobalIdentity: is function', t => {
  t.is(typeof globalIdentity, 'function')
}, 'should be of a function')

test('GlobalIdentity: return is object', t => {
  t.is(typeof globalIdentity(), 'object')
}, 'should be a object')

test('GlobalIdentity: return object has property Authorization of type Authorization', t => {
  t.true( authorization instanceof Authorization)
}, 'should be of the type Authorization')

test('GlobalIdentity: return object has property Management of type Management', t => {
  t.true( management instanceof Management)
}, 'should be of the type Management')
