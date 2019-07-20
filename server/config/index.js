import FS from 'fs-extra';
import Path from 'path';
const privateKey = FS.readFileSync(Path.resolve(__dirname + '/' + 'jwt-keys' + '/private.key'), 'utf-8');
const publicKey = FS.readFileSync(Path.resolve(__dirname + '/' + 'jwt-keys' + '/public.key'), 'utf-8');
module.exports = {
    privateKey,
    publicKey

};